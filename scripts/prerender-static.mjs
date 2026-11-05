import { createRequestHandler } from "@remix-run/node";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Keep in sync with normalizeBase() in vite.config.ts.
function normalizeBase(input) {
  const value = (input || "/").trim();
  if (value === "" || value === "/") return "/";
  const withLead = value.startsWith("/") ? value : `/${value}`;
  return withLead.endsWith("/") ? withLead : `${withLead}/`;
}

const base = normalizeBase(process.env.BASE_PATH);
const clientDir = path.resolve("build/client");
const serverBuildPath = path.resolve("build/server/index.js");
const BOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

function routeUrl(pathname) {
  if (pathname === "/") return `http://localhost${base}`;
  return `http://localhost${base}${pathname.replace(/^\//, "")}`;
}

function assertPublicPayload(payload) {
  if (!payload || !Array.isArray(payload.data) || !Number.isFinite(payload.totalAmount)) {
    throw new Error("app/data/donations.json is missing a usable donation payload.");
  }
  for (const row of payload.data) {
    for (const key of Object.keys(row)) {
      if (!["createdAt", "name", "comment"].includes(key)) {
        throw new Error(`donations.json contains a private field "${key}".`);
      }
    }
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function assertContains(html, text, label) {
  if (!html.includes(text)) {
    throw new Error(`Prerendered HTML is missing ${label}.`);
  }
}

function assertLocalRefs(html) {
  const refs = new Set();
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) refs.add(match[1]);
  for (const match of html.matchAll(/url\((?:&quot;|"|')([^"')]+)(?:&quot;|"|')\)/g)) {
    refs.add(match[1]);
  }

  for (const ref of refs) {
    if (!ref.startsWith(base)) continue;
    const rel = decodeURIComponent(ref.slice(base.length).split("?")[0].split("#")[0]);
    if (!rel || rel.endsWith("/")) continue;
    const file = path.join(clientDir, rel);
    if (!existsSync(file)) {
      throw new Error(`Prerendered HTML references missing file ${ref}`);
    }
  }
}

if (!existsSync(serverBuildPath)) {
  console.error("Missing build/server/index.js. Run remix vite:build first.");
  process.exit(1);
}

const donations = JSON.parse(readFileSync(path.resolve("app/data/donations.json"), "utf8"));
assertPublicPayload(donations);

const build = await import(pathToFileURL(serverBuildPath).href);
const handler = createRequestHandler(build, "production");

async function render(pathname) {
  const response = await handler(
    new Request(routeUrl(pathname), {
      headers: { "user-agent": BOT_UA },
    })
  );
  const html = await response.text();
  return { status: response.status, html };
}

try {
  const home = await render("/");
  if (home.status !== 200) {
    throw new Error(`Homepage render returned HTTP ${home.status}.\n${home.html.slice(0, 500)}`);
  }
  assertContains(home.html, "window.__remixContext =", "Remix hydration data");
  assertContains(home.html, "出版！加油！", "the page title");
  assertContains(home.html, "翻!!", "the news list");
  const total = new Intl.NumberFormat("en-US").format(donations.totalAmount);
  assertContains(home.html, `NT$ ${total}`, "the donation total");
  assertContains(home.html, `${donations.donner} 人`, "the donor count");
  assertContains(home.html, String(donations.totalAmount), "the total inside loader data");
  const sample = donations.data.find((row) => row.name && row.comment);
  if (sample) {
    assertContains(home.html, escapeHtml(sample.name), "a supporter name");
    assertContains(home.html, escapeHtml(sample.comment), "a supporter comment");
  }
  if (home.html.includes("BEGIN PRIVATE KEY") || home.html.includes("private_key")) {
    throw new Error("Refusing to write HTML that contains credential material.");
  }
  assertLocalRefs(home.html);
  writeFileSync(path.join(clientDir, "index.html"), home.html);

  const errorPage = await render("/500");
  if (errorPage.status !== 200) {
    throw new Error(`/500 render returned HTTP ${errorPage.status}.`);
  }
  assertContains(errorPage.html, "哇發生錯誤了", "the /500 page");
  assertLocalRefs(errorPage.html);
  mkdirSync(path.join(clientDir, "500"), { recursive: true });
  writeFileSync(path.join(clientDir, "500/index.html"), errorPage.html);
  writeFileSync(path.join(clientDir, "500.html"), errorPage.html);

  const homeHref = base === "/" ? "/" : base;
  const asset = (file) => `${base}${file}`;
  const notFound = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>找不到頁面</title>
  <link rel="icon" href="${asset("logo.png")}" type="image/png" />
  <style>
    body { margin: 0; background: #efefef; color: #302e2d; font-family: sans-serif; }
    main { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; }
    a { color: #ab3b3a; }
  </style>
</head>
<body>
  <main>
    <h1>找不到這個頁面</h1>
    <p><a href="${homeHref}">回到出版！加油！</a></p>
  </main>
</body>
</html>
`;
  writeFileSync(path.join(clientDir, "404.html"), notFound);
  writeFileSync(path.join(clientDir, ".nojekyll"), "");
  if (!existsSync(path.join(clientDir, "CNAME"))) {
    throw new Error("build/client/CNAME is missing. public/CNAME was not copied.");
  }

  console.log(
    `Prerendered ${path.relative(process.cwd(), clientDir)} (base ${base}, total NT$ ${total}, ${donations.donner} donors).`
  );
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown prerender error";
  console.error(message);
  process.exit(1);
}
