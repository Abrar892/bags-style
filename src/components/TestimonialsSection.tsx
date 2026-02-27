'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { testimonials } from '@/lib/data';

const StarRow = ({ count }: { count: number }) => (
    <div className="flex gap-0.5">
        {[...Array(count)].map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-current" style={{ color: '#D4AF37' }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background blob */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <span className="block font-inter text-xs font-semibold tracking-widest uppercase text-rose-gold mb-3">
                        Client Stories
                    </span>
                    <h2 className="section-title text-4xl md:text-5xl text-charcoal">
                        Words of the Discerning
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #E8D5CB)' }} />
                        <div className="w-2 h-2 rounded-full" style={{ background: '#D4AF37' }} />
                        <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #E8D5CB)' }} />
                    </div>
                </motion.div>

                {/* Testimonial cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -6 }}
                            className="glass-card p-7 flex flex-col gap-5"
                        >
                            {/* Quote mark */}
                            <div
                                className="font-playfair text-6xl leading-none opacity-20"
                                style={{ color: '#B76E79', lineHeight: '1' }}
                            >
                                &ldquo;
                            </div>

                            {/* Stars */}
                            <StarRow count={t.rating} />

                            {/* Quote */}
                            <p className="font-inter text-sm text-gray-600 leading-relaxed italic flex-1">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-3 border-t border-rose-50">
                                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={t.avatar}
                                        alt={t.name}
                                        fill
                                        className="object-cover"
                                        sizes="44px"
                                    />
                                </div>
                                <div>
                                    <p className="font-playfair text-sm font-semibold text-charcoal">{t.name}</p>
                                    <p className="font-inter text-xs text-gray-400">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-8 mt-16"
                >
                    {[
                        { icon: '🔒', label: 'Secure Checkout' },
                        { icon: '📦', label: 'Express Shipping' },
                        { icon: '↩️', label: '30-Day Returns' },
                        { icon: '✓', label: 'Authenticity Guarantee' },
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2.5 glass px-5 py-3 rounded-full">
                            <span className="text-base">{badge.icon}</span>
                            <span className="font-inter text-xs font-semibold text-charcoal tracking-wide">{badge.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
