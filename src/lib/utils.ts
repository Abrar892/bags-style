/**
 * Generates a URL-safe slug from any string.
 * "Luxury Leather Office Bag" → "luxury-leather-office-bag"
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')   // remove non-word chars except hyphens
        .replace(/[\s_]+/g, '-')    // spaces/underscores → hyphen
        .replace(/-+/g, '-')        // collapse multiple hyphens
        .replace(/^-+|-+$/g, '');   // trim leading/trailing hyphens
}
