import { google } from "googleapis";
import get from "lodash/get";

const SHEET_ID = "1lIz37f3uIlw68YYt4Q0ujSMOOAEmZV1-c4_Yz3IiYTc";
const RANGE = "序號登錄!A:H";

const HEADER_KEYS = [
  "unit",
  "createClient",
  "createDate",
  "code",
  "used",
  "exchangeUnit",
  "exchangeDate",
  "amount",
];

function formatData(data) {
  if (!data.length) return [];
  data.shift();
  const outputData = [];

  data.forEach((item, classIndex) => {
    const tObj = {};
    HEADER_KEYS.forEach((key, index) => {
      tObj[key] = item[index];
    });
    outputData.push(tObj);
  });
  return outputData;
}

export default async function loadData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });
  console.log("getRows", getRows);
  const data = get(getRows, "data.values", []);
  return formatData(data);
}

export async function loader() {
  const res = await loadData();
  return new Response(JSON.stringify({ data: res }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    },
  });
}
