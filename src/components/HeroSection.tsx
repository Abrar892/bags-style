'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const heroImages = [
    {
        src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=90',
        alt: 'Luxury fashion collection',
    },
    {
        src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=90',
        alt: 'Premium beauty products',
    },
    {
        src: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=90',
        alt: 'Luxury accessories',
    },
];

interface HeroSectionProps {
    productCount: number;
    categoryCount: number;
}

export default function HeroSection({ productCount, categoryCount }: HeroSectionProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Decorative background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(183,110,121,0.25) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(232,213,203,0.3) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Copy */}
                    <div className="text-center lg:text-left">
                        {/* Sub-label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="inline-flex items-center gap-3 mb-6"
                        >
                            <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-gold" style={{ background: '#D4AF37' }} />
                            <span className="font-inter text-xs font-semibold tracking-[0.3em] uppercase text-rose-gold">
                                New Season Arrivals
                            </span>
                            <div className="h-px w-10" style={{ background: '#D4AF37' }} />
                        </motion.div>

                        {/* Main headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="section-title text-5xl sm:text-6xl lg:text-7xl text-charcoal leading-[1.05] mb-6"
                        >
                            Discover{' '}
                            <span className="text-gradient-rose italic">Timeless</span>
                            <br />
                            <span className="text-gradient-gold">Elegance</span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.55 }}
                            className="font-inter text-base sm:text-lg text-gray-500 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
                        >
                            Discover an exclusive universe of premium fashion, beauty, and lifestyle — each piece
                            handpicked to elevate your everyday into the extraordinary.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <motion.a
                                href="#products"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                className="px-10 py-4 rounded-full text-sm font-inter font-semibold tracking-widest text-white text-center transition-all duration-300"
                                style={{
                                    background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                                    boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
                                }}
                            >
                                Explore Collection
                            </motion.a>
                            <motion.a
                                href="#categories"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                className="px-10 py-4 rounded-full text-sm font-inter font-medium tracking-widest text-charcoal text-center border transition-all duration-300 glass"
                                style={{ borderColor: 'rgba(183, 110, 121, 0.3)' }}
                            >
                                View Categories
                            </motion.a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="flex items-center gap-8 mt-12 justify-center lg:justify-start"
                        >
                            {[
                                { value: `${productCount}+`, label: 'Products' },
                                { value: `${categoryCount}`, label: 'Categories' },
                                { value: 'Trusted', label: 'Affiliate Partners' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center lg:text-left">
                                    <div className="font-playfair text-2xl font-bold text-charcoal">{stat.value}</div>
                                    <div className="font-inter text-xs text-gray-400 tracking-widest uppercase mt-0.5">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Image Gallery */}
                    <div className="relative h-[480px] sm:h-[560px] lg:h-[620px]">
                        {/* Main large image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-0 right-0 w-[75%] h-[75%] rounded-3xl overflow-hidden shadow-glass-lg"
                        >
                            <Image
                                src={heroImages[0].src}
                                alt={heroImages[0].alt}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 60vw, 40vw"
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, transparent 60%, rgba(183,110,121,0.15))' }} />
                        </motion.div>

                        {/* Secondary image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute bottom-0 left-0 w-[50%] h-[55%] rounded-3xl overflow-hidden shadow-glass"
                        >
                            <Image
                                src={heroImages[1].src}
                                alt={heroImages[1].alt}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 40vw, 25vw"
                            />
                        </motion.div>

                        {/* Floating glass card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            className="absolute bottom-[12%] right-[5%] glass-strong rounded-2xl px-4 py-3 shadow-glass"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden">
                                    <Image
                                        src={heroImages[2].src}
                                        alt="accessory"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-inter text-xs font-semibold text-charcoal">New Arrival</p>
                                    <p className="font-inter text-xs text-gray-400">Gold Statement Piece</p>
                                </div>
                                <div className="ml-2">
                                    <span className="text-xs font-inter font-bold" style={{ color: '#D4AF37' }}>$395</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="absolute -left-8 top-1/3 w-20 h-20 pointer-events-none opacity-30"
                            style={{
                                border: '2px dashed #D4AF37',
                                borderRadius: '50%',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-inter text-xs tracking-widest text-gray-400 uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-5 h-8 rounded-full border-2 border-rose-200 flex items-start justify-center pt-1.5"
                >
                    <div className="w-1 h-2 rounded-full bg-rose-gold" />
                </motion.div>
            </motion.div>
        </section>
    );
}
