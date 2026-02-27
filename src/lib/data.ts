export interface Product {
    id: string;
    // Legacy fields (used by existing components — do not rename)
    name: string;
    price: string;
    originalPrice?: string;
    description: string;
    category: string;
    imageUrl: string;
    affiliateUrl: string;
    badge?: string;
    rating?: number;
    reviews?: number;
    // DB-aligned fields (Supabase column names)
    redirect_url?: string;
    reviews_count?: number;
    isFeatured?: boolean;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
}

export const categories: Category[] = [
    {
        id: 'fashion',
        name: 'Fashion',
        description: 'Curated luxury apparel',
        icon: '✦',
        color: 'from-rose-100 to-pink-50',
    },
    {
        id: 'beauty',
        name: 'Beauty',
        description: 'Premium skincare & makeup',
        icon: '◈',
        color: 'from-amber-50 to-yellow-50',
    },
    {
        id: 'accessories',
        name: 'Accessories',
        description: 'Statement jewelry & bags',
        icon: '❖',
        color: 'from-purple-50 to-pink-50',
    },
    {
        id: 'lifestyle',
        name: 'Lifestyle',
        description: 'Elevated living essentials',
        icon: '◇',
        color: 'from-emerald-50 to-teal-50',
    },
];

export const products: Product[] = [
    {
        id: '1',
        name: 'Velvet Rose Eau de Parfum',
        price: '$185',
        originalPrice: '$220',
        description: 'A captivating blend of Bulgarian rose, warm amber, and soft musk. An olfactory journey into pure luxury.',
        category: 'beauty',
        imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=90',
        affiliateUrl: 'https://example.com/velvet-rose-parfum',
        badge: 'Bestseller',
        rating: 4.9,
        reviews: 342,
    },
    {
        id: '2',
        name: 'Silk & Cashmere Wrap Coat',
        price: '$1,290',
        description: 'A masterpiece in Italian cashmere with a silk lining. Drapes beautifully with an effortless silhouette.',
        category: 'fashion',
        imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=90',
        affiliateUrl: 'https://example.com/cashmere-wrap-coat',
        badge: 'New',
        rating: 4.8,
        reviews: 127,
    },
    {
        id: '3',
        name: 'Gold Leaf Statement Earrings',
        price: '$395',
        originalPrice: '$450',
        description: '18k gold-filled sculptural earrings featuring hand-hammered leaf motifs. A touch of modern artistry.',
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=90',
        affiliateUrl: 'https://example.com/gold-leaf-earrings',
        rating: 5.0,
        reviews: 89,
    },
    {
        id: '4',
        name: 'La Mer Renewal Serum',
        price: '$650',
        description: 'Miracle Broth™-powered serum that visibly renews skin at the deepest level. Luminous results in 2 weeks.',
        category: 'beauty',
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=90',
        affiliateUrl: 'https://example.com/la-mer-serum',
        badge: 'Luxury',
        rating: 4.7,
        reviews: 512,
    },
    {
        id: '5',
        name: 'Breton Structured Handbag',
        price: '$920',
        originalPrice: '$1,100',
        description: 'Full-grain Italian leather structured tote with gold hardware. A wardrobe investment that only gets better.',
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=90',
        affiliateUrl: 'https://example.com/breton-handbag',
        badge: 'Limited',
        rating: 4.9,
        reviews: 203,
    },
    {
        id: '6',
        name: 'Linen Maxi Sundress',
        price: '$445',
        description: 'Effortlessly elegant Belgian linen maxi dress in a flowing silhouette. Perfect for sun-drenched days.',
        category: 'fashion',
        imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=90',
        affiliateUrl: 'https://example.com/linen-maxi-dress',
        rating: 4.8,
        reviews: 178,
    },
    {
        id: '7',
        name: 'Diptyque Baies Candle',
        price: '$95',
        description: 'The iconic Baies scent — blackcurrant berries and fresh roses mingled in one exquisite candle.',
        category: 'lifestyle',
        imageUrl: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=90',
        affiliateUrl: 'https://example.com/diptyque-baies',
        badge: 'Iconic',
        rating: 4.9,
        reviews: 892,
    },
    {
        id: '8',
        name: 'Angora Pearl Cardigan',
        price: '$680',
        description: 'Ultra-soft angora blend cardigan adorned with hand-sewn freshwater pearls. Warmth meets haute style.',
        category: 'fashion',
        imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=90',
        affiliateUrl: 'https://example.com/angora-pearl-cardigan',
        badge: 'New',
        rating: 4.6,
        reviews: 64,
    },
    {
        id: '9',
        name: 'Sable Silk Pillowcase Set',
        price: '$220',
        originalPrice: '$265',
        description: '22 momme Mulberry silk pillowcases — the beauty sleep secret of skincare devotees worldwide.',
        category: 'lifestyle',
        imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=90',
        affiliateUrl: 'https://example.com/silk-pillowcase-set',
        rating: 4.8,
        reviews: 441,
    },
];

export const testimonials = [
    {
        id: '1',
        name: 'Sophia Laurent',
        role: 'Fashion Editor, Vogue Paris',
        quote: 'Yasir Luxe curates pieces I cannot find anywhere else. Each purchase feels like discovering a secret garden of luxury.',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=90',
        rating: 5,
    },
    {
        id: '2',
        name: 'Amara Chen',
        role: 'Beauty Influencer & Entrepreneur',
        quote: 'The quality is unmatched. These products have transformed not just my wardrobe but my entire approach to self-care.',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=90',
        rating: 5,
    },
    {
        id: '3',
        name: 'Isabella Rossi',
        role: 'CEO, Milano Design Studio',
        quote: 'I\'ve found my forever luxury destination. The curation is impeccable, and the experience is simply divine.',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=90',
        rating: 5,
    },
];
