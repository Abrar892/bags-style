import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
    weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: {
        default: 'Bags & Style — Premium Curated Fashion & Beauty',
        template: '%s | Bags & Style',
    },
    description:
        'Discover premium curated fashion, beauty, and lifestyle products. Exclusive collections handpicked for the modern connoisseur of style.',
    keywords: [
        'luxury fashion',
        'premium beauty',
        'curated lifestyle',
        'designer products',
        'luxury e-commerce',
    ],
    authors: [{ name: 'Yasir' }],
    creator: 'Yasir',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://bags&style.com',
        siteName: 'Bags & Style',
        title: 'Bags & Style — Premium Curated Fashion & Beauty',
        description:
            'Discover premium curated fashion, beauty, and lifestyle products. Exclusive collections handpicked for the modern connoisseur of style.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Bags & Style — Premium Curated Fashion',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Bags & Style — Premium Curated Fashion & Beauty',
        description: 'Exclusive premium collections handpicked for the modern connoisseur of style.',
        images: ['/og-image.jpg'],
        creator: '@yasirluxe',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    metadataBase: new URL('https://bags&style.com'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#B76E79" />
            </head>
            <body className="font-inter antialiased">{children}</body>
        </html>
    );
}
