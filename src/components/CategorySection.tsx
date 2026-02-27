'use client';

import { motion } from 'framer-motion';
import { categories } from '@/lib/data';

const categoryImages = {
    fashion: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=90',
    beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=90',
    accessories: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=90',
    lifestyle: 'https://images.unsplash.com/photo-1526887593587-14e0e2870943?w=500&q=90',
};

export default function CategorySection() {
    return (
        <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <span className="block font-inter text-xs font-semibold tracking-widest uppercase text-rose-gold mb-3">
                        Browse by World
                    </span>
                    <h2 className="section-title text-4xl md:text-5xl text-charcoal">
                        Our Universe of Luxury
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #E8D5CB)' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
                        <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #E8D5CB)' }} />
                    </div>
                </motion.div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.a
                            key={category.id}
                            href={`#products`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative overflow-hidden rounded-3xl cursor-pointer"
                            style={{ aspectRatio: '3/4' }}
                        >
                            {/* Background image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                                style={{
                                    backgroundImage: `url('${categoryImages[category.id as keyof typeof categoryImages]}')`,
                                }}
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            {/* Glassmorphism badge at top */}
                            <div className="absolute top-4 left-4 glass rounded-xl px-3 py-1.5">
                                <span className="font-inter text-xs font-semibold text-white tracking-widest">
                                    {category.icon} {category.name}
                                </span>
                            </div>

                            {/* Content at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                                    {category.name}
                                </h3>
                                <p className="font-inter text-xs text-white/70 tracking-wide">
                                    {category.description}
                                </p>

                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '40px' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className="mt-3 h-0.5"
                                    style={{ background: '#D4AF37' }}
                                />

                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-1.5 mt-3 font-inter text-xs font-semibold text-white/80 tracking-widest uppercase"
                                >
                                    Shop Now →
                                </motion.span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
