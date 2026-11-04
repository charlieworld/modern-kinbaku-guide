# 出版！加油！

Static site for the 《現代緊縛入門》中文翻譯募款頁. Remix still renders the page, but `yarn build` writes HTML into `build/client` so it can be hosted on GitHub Pages. Donation totals and supporter comments come from a Google Sheet. They are fetched while the site is built, not when someone opens a page.

The public page shows the total, the donor count, and comments. Email addresses, individual amounts, and the remark column are removed before anything is written to disk.

## Local development

Create a gitignored `credentials.json` in the repo root (the service account key), or export `GOOGLE_CREDENTIALS` with that same JSON.

```shell
yarn dev
```

`yarn dev` refreshes `app/data/donations.json` when credentials are present, then starts the Remix dev server. With no credentials, it reuses the snapshot already in the repo.

## Production build

```shell
yarn build
npx serve build/client
```

`build/client/index.html` is the homepage with the sheet data already rendered. `/500` is `500/index.html` (and `500.html`). Unknown paths use `404.html`. Open `http://localhost:3000` after `serve` starts and check the total, the comments, and both tabs (最新消息 / 簡介).

`yarn start` still boots `remix-serve` for a Node host. GitHub Pages uses `build/client` only.

## Deploy to GitHub Pages

### 1. Add the secret

In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**.

- Name: `GOOGLE_CREDENTIALS`
- Value: the full JSON of a Google Cloud service account key that can read the donation spreadsheet (`表單回應`)

Create a new key. `credentials.json` used to be committed, and that private key is still in git history. In Google Cloud, open IAM → Service accounts → `tinateatw@smerwisper.iam.gserviceaccount.com` and delete key `dee0e383f568ddac104c40ff8ea8969c5fb5a576` before this repository is made public. Share the sheet with the new service account email.

### 2. Turn on Pages

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

GitHub Pages on the free plan serves public repositories. This repo is private. Make it public only after the key above has been deleted. A private Pages site needs GitHub Pro.

### 3. What the workflow does

`.github/workflows/pages.yml` runs on every push to `main`, every day at 00:00 Asia/Taipei (`0 16 * * *` UTC), and when someone starts it by hand (**Actions → Deploy GitHub Pages → Run workflow**).

It installs dependencies, reads `GOOGLE_CREDENTIALS`, builds, then deploys `build/client` with `actions/upload-pages-artifact` and `actions/deploy-pages`. The workflow refuses to build if the secret is missing, so a scheduled run cannot publish a stale snapshot by accident.

Sheet edits show up after the next run. Use **Run workflow** when a new donation should appear the same day.

### 4. Point the custom domain

The site is built with base path `/` because `https://contemporary-kinbaku-guide.site` is served from the domain root. `public/CNAME` contains:

```text
contemporary-kinbaku-guide.site
```

That file is copied into the Pages artifact. After the first deploy, confirm the domain under **Settings → Pages** and turn on **Enforce HTTPS** once the certificate exists.

DNS for this domain currently goes through Cloudflare to Render. Update the Cloudflare records (the registrar record alone will not change what Cloudflare serves):

- Apex `contemporary-kinbaku-guide.site`: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `www`: CNAME `charlieworld.github.io` if you still want www. It redirects to the apex today.

GitHub documents these addresses at [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). If Cloudflare stays in front of Pages, use Full SSL only after GitHub has issued the certificate, or set the records to DNS-only.

`https://charlieworld.github.io/modern-kinbaku-guide/` is a project-site URL. Asset paths in this build are root-absolute (`/assets/...`, `/cover_2.jpg`), which match the custom domain. After the domain is verified, GitHub redirects the project URL to the custom domain. To test on the project URL before DNS changes, rebuild with `BASE_PATH=/modern-kinbaku-guide/`.

### 5. Suspend Render

When the custom domain shows this Pages build (total, comments, news, images, both tabs), suspend the Render web service `modern-kinbaku-guide` (Singapore, starter).

Merging to `main` also redeploys Render while auto-deploy is on. That build no longer has `credentials.json`, so Render serves the committed snapshot instead of reading Google on each request. New rows will not appear there. Pause auto-deploy on Render before merging if the current Node process should stay up unchanged until you suspend it.

## Routes

| URL | Static file | Notes |
| --- | --- | --- |
| `/` | `index.html` | Homepage, including `?news=` |
| `/500` | `500/index.html` and `500.html` | Existing error page |
| anything else | `404.html` | Same idea as today's 404s (`/news` is not a route) |

There is no client-side route besides the homepage tabs, so `404.html` is a real not-found page rather than a copy of `index.html`. Copying the homepage onto 404 would show the wrong URL to Remix after hydration.

## What needs a server, and what was left out

- **`/api/data`** reads a second spreadsheet (`序號登錄`, id `1lIz37f3uIlw68YYt4Q0ujSMOOAEmZV1-c4_Yz3IiYTc`) and tries to return JSON with `Cache-Control: no-store`. Nothing in the pages calls it. The service account gets HTTP 403 for that sheet, and the live URL already returns HTTP 500. GitHub Pages cannot host that live API. The route was removed, so the URL becomes the static 404. The serial sheet is not copied into the site.
- **No page submits a form, writes to Google, or saves CKEditor content.** CKEditor, Formik, and the unused `api.smertw.com` login/event helpers are leftover modules. They are not mounted on a route. 訂閱翻譯進度 and 立即贊助 still open the same Google Forms.
- **Freshness.** Totals and comments update when the workflow runs, not on the next visit.
