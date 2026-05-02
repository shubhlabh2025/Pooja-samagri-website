import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Sitemap from "vite-plugin-sitemap";

const SITE_URL = "https://shubhlabhpoojasamagri.com";
const API_URL = process.env.API_URL || "https://api.shubhlabhpoojasamagri.com";

// Public, indexable static routes from src/App.tsx.
// Cart / Orders / Profile / Address / Payment are user-specific (excluded below).
const STATIC_ROUTES = ["/categories", "/privacy-policy"];

const UUID_RE =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

const buildSlug = (name: string | undefined, id: string): string => {
  const base = name ? slugify(name) : "";
  return base ? `${base}-${id}` : id;
};

async function fetchJsonSafe<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[sitemap] ${url} → ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.warn(`[sitemap] ${url} fetch failed:`, (e as Error).message);
    return null;
  }
}

// Pulls products + categories from the live API. Failures are non-fatal —
// build still succeeds with static routes only, and the build log will tell
// you exactly what was added or skipped.
async function getDynamicRoutes(): Promise<string[]> {
  const routes: string[] = [];

  const cats = await fetchJsonSafe<{
    data: { id: string; name: string }[];
  }>(`${API_URL}/api/categories?page=1&limit=500`);
  if (cats?.data) {
    for (const c of cats.data) {
      routes.push(`/categories/${buildSlug(c.name, c.id)}`);
    }
    console.log(`[sitemap] +${cats.data.length} category routes`);
  }

  const prods = await fetchJsonSafe<{
    data: {
      id: string;
      product_variants: { name: string; default_variant: boolean }[];
    }[];
  }>(`${API_URL}/api/products/search?page=1&limit=5000`);
  if (prods?.data) {
    let added = 0;
    for (const p of prods.data) {
      const v =
        p.product_variants.find((x) => x.default_variant) ||
        p.product_variants[0];
      if (!v) continue;
      const slug = buildSlug(v.name, p.id);
      if (!UUID_RE.test(slug) && slug !== p.id) continue;
      routes.push(`/products/${slug}`);
      added++;
    }
    console.log(`[sitemap] +${added} product routes`);
  }

  return routes;
}

// https://vite.dev/config/
export default defineConfig(async () => {
  const dynamicRoutes = [...STATIC_ROUTES, ...(await getDynamicRoutes())];
  console.log(`[sitemap] total dynamicRoutes: ${dynamicRoutes.length}`);

  return {
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: SITE_URL,
        dynamicRoutes,
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
          "/account-deletion",
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
  };
});
