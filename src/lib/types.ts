// Canonical DB-aligned product type.
// All new fields are optional so existing rows without them work perfectly.
export interface DbProduct {
    id: string;
    title: string;
    description: string;
    price: string;
    rating?: number | null;
    reviews_count?: number | null;
    image_url?: string | null;
    redirect_url?: string | null;
    category?: string | null;
    created_at?: string;

    // ── New optional fields (product detail page) ──
    slug?: string | null;
    short_summary?: string | null;
    key_features?: string[] | null;        // stored as JSONB array
    specifications?: Record<string, string> | null; // stored as JSONB key-value
    pros?: string[] | null;                // stored as JSONB array
    cons?: string[] | null;                // stored as JSONB array
    faq?: { question: string; answer: string }[] | null; // JSONB
    seo_title?: string | null;
    seo_description?: string | null;
    related_products?: string[] | null;    // array of product ids
}
