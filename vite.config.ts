import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

const SITE_URL = "https://shubhlabhpoojasamagri.com";

// Public, indexable routes from src/App.tsx that the plugin can't auto-discover.
// "/" is auto-discovered from index.html; we only list non-index entries here.
// Cart / Orders / Profile / Address / Payment screens are intentionally
// excluded — they're user-specific and not crawlable.
// Dynamic /products/:slug and /categories/:slug entries should be appended
// at build time by `scripts/generateSitemap.ts` (which queries the live API);
// this plugin handles only the static skeleton.
const STATIC_ROUTES = [
  "/categories",
  "/privacy-policy",
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: SITE_URL,
      dynamicRoutes: STATIC_ROUTES,
      // Pages that should never appear in the sitemap.
      exclude: [
        "/cart",
        "/cart/*",
        "/orders",
        "/orders/*",
        "/profile",
        "/address",
        "/payment-page",
        "/order-success",
        "/order-failure",
      ],
      changefreq: {
        "/": "daily",
        "/categories": "weekly",
        "/privacy-policy": "yearly",
      },
      priority: {
        "/": 1.0,
        "/categories": 0.8,
        "/privacy-policy": 0.3,
      },
      generateRobotsTxt: false, // we maintain our own robots.txt
      readable: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
