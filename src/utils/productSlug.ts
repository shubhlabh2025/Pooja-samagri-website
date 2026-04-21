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

export function buildProductSlug(name: string | undefined, id: string): string {
  const base = name ? slugify(name) : "";
  return base ? `${base}-${id}` : id;
}

export function extractProductId(slug: string): string {
  const match = slug.match(UUID_AT_END);
  return match ? match[1] : slug;
}

export function buildProductPath(name: string | undefined, id: string): string {
  return `/products/${buildProductSlug(name, id)}`;
}
