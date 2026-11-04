import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Keep in sync with normalizeBase() in scripts/prerender-static.mjs.
// The custom domain is served from /. Set BASE_PATH (for example
// /modern-kinbaku-guide/) only when building for a project-pages URL.
function normalizeBase(input: string | undefined): string {
  const value = (input || "/").trim();
  if (value === "" || value === "/") return "/";
  const withLead = value.startsWith("/") ? value : `/${value}`;
  return withLead.endsWith("/") ? withLead : `${withLead}/`;
}

const base = normalizeBase(process.env.BASE_PATH);

export default defineConfig({
  base,
  plugins: [
    remix({
      basename: base,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
