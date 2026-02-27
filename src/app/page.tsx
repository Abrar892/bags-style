import { createClient } from '@/lib/supabase/server';
import { products as fallbackProducts } from '@/lib/data';
import { Product } from '@/lib/data';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import ProductGrid from '@/components/ProductGrid';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

// Map a Supabase DB row → Product shape expected by existing components
function mapDbProduct(row: Record<string, unknown>): Product {
    return {
        id: String(row.id),
        name: String(row.title ?? ''),
        price: String(row.price ?? ''),
        description: String(row.description ?? ''),
        category: String(row.category ?? 'fashion'),
        imageUrl: String(row.image_url ?? ''),
        affiliateUrl: String(row.redirect_url ?? '#'),
        rating: row.rating != null ? Number(row.rating) : undefined,
        reviews: row.reviews_count != null ? Number(row.reviews_count) : undefined,
        isFeatured: Boolean(row.is_featured),
        redirect_url: String(row.redirect_url ?? '#'),
        reviews_count: row.reviews_count != null ? Number(row.reviews_count) : undefined,
    };
}

export default async function Home() {
    let products: Product[] = fallbackProducts;

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
            products = data.map(mapDbProduct);
        }
    } catch {
        // Supabase unavailable — fall back to static data
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'Bags & Style',
        description:
            'Premium curated fashion, beauty, and lifestyle products. Exclusive collections handpicked for the modern connoisseur of style.',
        url: 'https://bags-and-style.com',
        logo: 'https://bags-and-style.com/logo.png',
        sameAs: [
            'https://instagram.com/bagsandstyle',
            'https://pinterest.com/bagsandstyle',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Luxury Collection',
            itemListElement: products.map((p) => ({
                '@type': 'Product',
                name: p.name,
                description: p.description,
                image: p.imageUrl,
                offers: {
                    '@type': 'Offer',
                    price: p.price.replace(/[^0-9.]/g, ''),
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    url: p.affiliateUrl,
                },
            })),
        },
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <main className="relative">
                <Navbar />
                <HeroSection />
                <CategorySection />
                <ProductGrid
                    products={products}
                    title="Curated Picks"
                    subtitle="The Collection"
                />
                <TestimonialsSection />
                <NewsletterSection />
                <Footer />
            </main>
        </>
    );
}
