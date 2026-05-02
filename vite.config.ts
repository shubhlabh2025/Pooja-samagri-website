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

// API caps `limit` at 100 per request, so we paginate. Stop early if a page
// returns fewer than the page size or after a hard safety cap.
const PAGE_SIZE = 100;
const MAX_PAGES = 100; // 100 * 100 = 10k items max — plenty.

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta?: {
    totalPages?: number;
    currentPage?: number;
  };
}

async function fetchAllPages<T>(
  baseUrl: string,
  label: string
): Promise<T[]> {
  const all: T[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const sep = baseUrl.includes("?") ? "&" : "?";
    const url = `${baseUrl}${sep}page=${page}&limit=${PAGE_SIZE}`;
    const res = await fetchJsonSafe<PaginatedResponse<T>>(url);
    if (!res?.data) break;
    all.push(...res.data);

    const totalPages = res.meta?.totalPages ?? 1;
    if (res.data.length < PAGE_SIZE || page >= totalPages) break;
  }
  console.log(`[sitemap] fetched ${all.length} ${label}`);
  return all;
}

// Pulls products + categories from the live API. Failures are non-fatal —
// build still succeeds with static routes only.
async function getDynamicRoutes(): Promise<string[]> {
  const routes: string[] = [];

  const categories = await fetchAllPages<{ id: string; name: string }>(
    `${API_URL}/api/categories`,
    "categories"
  );
  for (const c of categories) {
    routes.push(`/categories/${buildSlug(c.name, c.id)}`);
  }

  const products = await fetchAllPages<{
    id: string;
    product_variants: { name: string; default_variant: boolean }[];
  }>(`${API_URL}/api/products/search`, "products");
  for (const p of products) {
    const v =
      p.product_variants.find((x) => x.default_variant) ||
      p.product_variants[0];
    if (!v) continue;
    const slug = buildSlug(v.name, p.id);
    if (!UUID_RE.test(slug) && slug !== p.id) continue;
    routes.push(`/products/${slug}`);
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
