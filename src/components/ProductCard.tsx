'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data';
import { generateSlug } from '@/lib/utils';

const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg
        viewBox="0 0 20 20"
        className={`w-3 h-3 ${filled ? 'text-amber-gold fill-current' : 'text-gray-300 fill-current'}`}
        style={{ color: filled ? '#D4AF37' : '#d1d5db' }}
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const stars = product.rating ? Math.round(product.rating) : 5;
    // Use DB slug if present, otherwise derive from name (for static fallback products)
    const slug = (product as Product & { slug?: string }).slug || generateSlug(product.name);
    const detailHref = `/products/${slug}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col glass-card overflow-hidden"
        >
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                    <span
                        className="px-3 py-1 text-xs font-inter font-semibold tracking-wider rounded-full text-white"
                        style={{ background: 'linear-gradient(135deg, #B76E79, #9B5066)' }}
                    >
                        {product.badge}
                    </span>
                </div>
            )}

            {/* Entire card is a link to detail page */}
            <Link href={detailHref} className="flex flex-col flex-1">
                {/* Image */}
                <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '4/3' }}>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                    {/* Category */}
                    <span className="text-xs font-inter font-medium tracking-widest uppercase text-rose-gold">
                        {product.category}
                    </span>

                    {/* Product Name */}
                    <h3 className="font-playfair text-lg font-semibold leading-snug text-charcoal group-hover:text-dark-rose transition-colors duration-300">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
                        {product.description}
                    </p>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} filled={i < stars} />
                                ))}
                            </div>
                            <span className="text-xs font-inter text-gray-400">
                                {product.rating} ({product.reviews?.toLocaleString()})
                            </span>
                        </div>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-rose-100">
                        <div className="flex flex-col">
                            <span className="font-playfair text-xl font-bold text-charcoal">{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xs font-inter text-gray-400 line-through">
                                    {product.originalPrice}
                                </span>
                            )}
                        </div>

                        <span
                            className="px-5 py-2.5 rounded-full text-xs font-inter font-semibold tracking-widest text-white transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                                boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)',
                            }}
                        >
                            View Deal
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
