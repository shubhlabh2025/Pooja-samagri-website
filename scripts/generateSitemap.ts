/**
 * Build-time sitemap generator.
 *
 * Usage:
 *   SITE_URL=https://shubhlabhpoojasamagri.com \
 *   API_URL=https://api.shubhlabhpoojasamagri.com \
 *   npx tsx scripts/generateSitemap.ts
 *
 * Outputs: public/sitemap.xml  (run BEFORE `vite build` so it ships in /dist)
 */
import { writeFileSync } from "fs";
import { resolve } from "path";

const SITE_URL = process.env.SITE_URL || "https://shubhlabhpoojasamagri.com";
const API_URL = process.env.API_URL || "https://api.shubhlabhpoojasamagri.com";

const UUID_AT_END = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function buildSlug(name: string | undefined, id: string): string {
  const base = name ? slugify(name) : "";
  return base ? `${base}-${id}` : id;
}

type UrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
};

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

function entryXml(e: UrlEntry): string {
  return [
    "  <url>",
    `    <loc>${e.loc}</loc>`,
    e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : "",
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : "",
    e.priority != null ? `    <priority>${e.priority.toFixed(1)}</priority>` : "",
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  const entries: UrlEntry[] = [
    { loc: `${SITE_URL}/`, changefreq: "daily", priority: 1.0 },
    { loc: `${SITE_URL}/categories`, changefreq: "weekly", priority: 0.8 },
    { loc: `${SITE_URL}/privacy-policy`, changefreq: "yearly", priority: 0.3 },
  ];

  try {
    const catRes = await fetchJson<{
      data: { id: string; name: string; updatedAt?: string }[];
    }>("/api/categories?limit=500");
    for (const c of catRes.data) {
      entries.push({
        loc: `${SITE_URL}/categories/${buildSlug(c.name, c.id)}`,
        lastmod: c.updatedAt?.slice(0, 10),
        changefreq: "weekly",
        priority: 0.7,
      });
    }
  } catch (e) {
    console.warn("category fetch failed:", (e as Error).message);
  }

  try {
    // Paginate if your API supports it; adjust as needed.
    const prodRes = await fetchJson<{
      data: {
        id: string;
        updatedAt?: string;
        product_variants: { name: string; default_variant: boolean }[];
      }[];
    }>("/api/products/search?limit=5000");
    for (const p of prodRes.data) {
      const v =
        p.product_variants.find((x) => x.default_variant) ||
        p.product_variants[0];
      if (!v) continue;
      // Validate id suffix round-trips cleanly.
      const slug = buildSlug(v.name, p.id);
      if (!UUID_AT_END.test(slug) && slug !== p.id) continue;
      entries.push({
        loc: `${SITE_URL}/products/${slug}`,
        lastmod: p.updatedAt?.slice(0, 10),
        changefreq: "weekly",
        priority: 0.9,
      });
    }
  } catch (e) {
    console.warn("product fetch failed:", (e as Error).message);
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.map(entryXml).join("\n") +
    `\n</urlset>\n`;

  const out = resolve(process.cwd(), "public", "sitemap.xml");
  writeFileSync(out, xml, "utf8");
  console.log(`Wrote ${entries.length} URLs → ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
