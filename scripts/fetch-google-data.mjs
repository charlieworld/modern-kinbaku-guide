import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

const SHEET_ID = "19CPChJ_GGOMJm4EUfggEQpOhAw23qK7EBD1WuamptBE";
const RANGE = "表單回應!A:F";
const HEADER_KEYS = [
  "createdAt",
  "donateAmount",
  "name",
  "email",
  "comment",
  "remark",
];
const PUBLIC_KEYS = ["createdAt", "name", "comment"];
const OUT_DIR = path.resolve("app/data");
const OUT_FILE = path.join(OUT_DIR, "donations.json");
const TMP_FILE = path.join(OUT_DIR, ".donations.json.tmp");

function credentialsPath() {
  return process.env.GOOGLE_APPLICATION_CREDENTIALS || path.resolve("credentials.json");
}

function hasCredentials() {
  if (process.env.GOOGLE_CREDENTIALS && process.env.GOOGLE_CREDENTIALS.trim()) {
    return true;
  }
  return existsSync(credentialsPath());
}

function loadCredentials() {
  const fromEnv = process.env.GOOGLE_CREDENTIALS;
  if (fromEnv && fromEnv.trim()) {
    try {
      return JSON.parse(fromEnv.replace(/^\uFEFF/, ""));
    } catch {
      throw new Error(
        "GOOGLE_CREDENTIALS is set but is not valid JSON. Paste the full service account key file."
      );
    }
  }

  const keyFile = credentialsPath();
  try {
    return JSON.parse(readFileSync(keyFile, "utf8").replace(/^\uFEFF/, ""));
  } catch {
    throw new Error(`Could not parse the service account JSON at ${keyFile}.`);
  }
}

function formatRows(values) {
  if (!values.length) return [];
  return values.slice(1).map((item) => {
    const row = {};
    HEADER_KEYS.forEach((key, index) => {
      row[key] = item[index];
    });
    return row;
  });
}

function toPublicPayload(rows) {
  const counted = rows.filter((row) => !row.remark);
  const totalAmount = counted
    .map((row) => row.donateAmount)
    .reduce((sum, amount) => Number(sum) + Number(amount), 0);
  const data = rows.map((row) => {
    const copy = { ...row };
    delete copy.donateAmount;
    delete copy.email;
    delete copy.remark;
    return copy;
  });

  if (!Number.isFinite(totalAmount)) {
    throw new Error("Donation total is not a finite number. Check the amount column.");
  }
  if (!data.length) {
    throw new Error("Donation sheet returned no data rows. Refusing to build an empty site.");
  }
  for (const row of data) {
    for (const key of Object.keys(row)) {
      if (!PUBLIC_KEYS.includes(key)) {
        throw new Error(`Refusing to write unexpected donation field "${key}".`);
      }
    }
  }

  return {
    totalAmount,
    donner: counted.length,
    data,
  };
}

if (!hasCredentials()) {
  if (process.env.REQUIRE_GOOGLE_CREDENTIALS === "1") {
    console.error(
      "GOOGLE_CREDENTIALS is required for this build. Add the repository secret before deploying."
    );
    process.exit(1);
  }
  if (!existsSync(OUT_FILE)) {
    console.error(
      "No Google credentials found and app/data/donations.json is missing. Set GOOGLE_CREDENTIALS or add a gitignored credentials.json."
    );
    process.exit(1);
  }
  console.log("No Google credentials found; using the existing app/data/donations.json snapshot.");
  process.exit(0);
}

try {
  const credentials = loadCredentials();
  const { google } = await import("googleapis");
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });
  const payload = toPublicPayload(formatRows(response.data.values || []));
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(TMP_FILE, `${JSON.stringify(payload, null, 2)}\n`);
  renameSync(TMP_FILE, OUT_FILE);
  console.log(
    `Fetched donations: total=${payload.totalAmount} donors=${payload.donner} comments=${payload.data.length} account=${credentials.client_email || "unknown"}`
  );
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`Failed to fetch the donation sheet: ${message}`);
  process.exit(1);
}
