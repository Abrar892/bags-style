'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setEmail('');
        }
    };

    return (
        <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative glass-card px-8 py-14 sm:px-14 text-center overflow-hidden"
                >
                    {/* Background glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse at 50% 120%, rgba(212,175,55,0.12) 0%, transparent 60%)',
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 mx-auto"
                            style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(183,110,121,0.2))' }}
                        >
                            <span className="text-2xl">✦</span>
                        </motion.div>

                        <span className="block font-inter text-xs font-semibold tracking-widest uppercase text-rose-gold mb-3">
                            Join the Inner Circle
                        </span>
                        <h2 className="section-title text-3xl sm:text-4xl text-charcoal mb-4">
                            Elevate Your Inbox
                        </h2>
                        <p className="font-inter text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-8">
                            Receive exclusive early access to new collections, curated style guides,
                            and members-only offers crafted for the truly discerning.
                        </p>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass px-8 py-4 rounded-2xl inline-block"
                            >
                                <p className="font-playfair text-lg text-charcoal">
                                    ✦ Welcome to the Circle
                                </p>
                                <p className="font-inter text-xs text-gray-500 mt-1">
                                    Your exclusive access awaits.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    required
                                    className="flex-1 px-5 py-3.5 rounded-full font-inter text-sm text-charcoal bg-white/70 border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold/50 placeholder-gray-400 backdrop-blur-sm"
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="px-8 py-3.5 rounded-full font-inter font-semibold text-sm text-white tracking-wider"
                                    style={{
                                        background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                                        boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
                                    }}
                                >
                                    Join Now
                                </motion.button>
                            </form>
                        )}

                        <p className="font-inter text-xs text-gray-400 mt-5">
                            No spam, ever. Unsubscribe at any time. ✦
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
