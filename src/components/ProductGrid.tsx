'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@/lib/data';
import { useState } from 'react';

interface ProductGridProps {
    products: Product[];
    title?: string;
    subtitle?: string;
}

const categories = ['All', 'fashion', 'beauty', 'accessories', 'lifestyle'];

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered =
        activeCategory === 'All'
            ? products
            : products.filter((p) => p.category === activeCategory);

    return (
        <section id="products" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-14"
                    >
                        {subtitle && (
                            <span className="block font-inter text-xs font-semibold tracking-widest uppercase text-rose-gold mb-3">
                                {subtitle}
                            </span>
                        )}
                        {title && (
                            <h2 className="section-title text-4xl md:text-5xl text-charcoal">
                                {title}
                            </h2>
                        )}
                        <div className="mt-4 flex items-center justify-center gap-3">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
                            <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
                        </div>
                    </motion.div>
                )}

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2.5 rounded-full text-xs font-inter font-semibold tracking-widest uppercase transition-all duration-300 ${activeCategory === cat
                                    ? 'text-white shadow-gold'
                                    : 'glass text-charcoal/70 hover:text-charcoal'
                                }`}
                            style={
                                activeCategory === cat
                                    ? {
                                        background:
                                            'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                                        boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
                                    }
                                    : {}
                            }
                        >
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Grid */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {filtered.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </motion.div>

                {/* Load More hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center mt-14"
                >
                    <span className="font-inter text-sm text-gray-400 tracking-wide">
                        Showing {filtered.length} of {products.length} pieces
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
