import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { DbProduct } from '@/lib/types';
import { generateSlug } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import ProductDetailClient from './ProductDetailClient';

// ─── Supabase Public Client ───────────────────────────────────────────────────
// We use the direct supabase-js client instead of @supabase/ssr here because
// generateStaticParams runs at build time and cannot access cookies().

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getProduct(slug: string): Promise<DbProduct | null> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();
    if (error || !data) return null;
    return data as DbProduct;
}

async function getRelatedProducts(category: string, currentId: string): Promise<DbProduct[]> {
    const { data } = await supabase
        .from('products')
        .select('id, title, price, image_url, slug, category, rating, reviews_count')
        .eq('category', category)
        .neq('id', currentId)
        .limit(4);
    return (data as DbProduct[]) ?? [];
}

// ─── Static Params (for SSG of known slugs) ───────────────────────────────────

export async function generateStaticParams() {
    const { data } = await supabase.from('products').select('slug').not('slug', 'is', null);
    return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);
    if (!product) return { title: 'Product Not Found' };

    const title = product.seo_title || `${product.title} — Bags & Style`;
    const description =
        product.seo_description ||
        product.short_summary ||
        product.description.slice(0, 160);
    const image = product.image_url ?? '/og-default.jpg';
    const url = `https://bags-and-style.com/products/${slug}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [{ url: image, width: 1200, height: 630, alt: product.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const product = await getProduct(slug);
    if (!product) notFound();

    const related = await getRelatedProducts(product.category ?? '', product.id);

    // JSON-LD — Product Schema + Breadcrumb Schema
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: product.image_url,
        offers: {
            '@type': 'Offer',
            price: product.price.replace(/[^0-9.]/g, '') || '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: product.redirect_url,
        },
        ...(product.rating != null && {
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                reviewCount: product.reviews_count ?? 1,
                bestRating: 5,
                worstRating: 1,
            },
        }),
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bags-and-style.com' },
            {
                '@type': 'ListItem', position: 2,
                name: product.category
                    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
                    : 'Products',
                item: `https://bags-and-style.com/#categories`,
            },
            {
                '@type': 'ListItem', position: 3,
                name: product.title,
                item: `https://bags-and-style.com/products/${slug}`,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navbar />
            <ProductDetailClient product={product} related={related} slug={slug} />
        </>
    );
}
