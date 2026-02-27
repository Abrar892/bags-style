'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = {
    Collection: ['New Arrivals', 'Fashion', 'Beauty', 'Accessories', 'Lifestyle'],
    Company: ['About Us', 'Sustainability', 'Press', 'Careers', 'Contact'],
    Support: ['FAQs', 'Shipping Info', 'Returns', 'Size Guide', 'Track Order'],
};

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-rose-100">
            {/* Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(253,231,231,0.4) 100%)',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top section */}
                <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2 mb-5">
                            <div
                                className="w-7 h-7 rounded-full"
                                style={{ background: 'linear-gradient(135deg, #D4AF37, #B76E79)' }}
                            />
                            <span className="font-playfair text-xl font-bold tracking-wide text-charcoal">
                                Bags <span className="text-gradient-gold">&amp; Style</span>
                            </span>
                        </Link>
                        <p className="font-inter text-sm text-gray-500 leading-relaxed max-w-xs">
                            A curated universe of luxury fashion, beauty, and lifestyle. For those who
                            believe that every detail matters.
                        </p>

                        {/* Social links */}
                        <div className="flex gap-3 mt-6">
                            {['Instagram', 'Pinterest', 'TikTok', 'X'].map((social) => (
                                <motion.a
                                    key={social}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-9 h-9 rounded-full glass flex items-center justify-center font-inter text-xs font-medium text-charcoal hover:text-rose-gold transition-colors"
                                    aria-label={social}
                                >
                                    {social[0]}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h3 className="font-playfair text-sm font-semibold text-charcoal mb-4 tracking-wide">
                                {group}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="font-inter text-xs text-gray-500 hover:text-rose-gold transition-colors duration-200 tracking-wide"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #E8D5CB, transparent)' }} />

                {/* Bottom bar */}
                <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-xs text-gray-400">
                        © {new Date().getFullYear()} Bags & Style. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="font-inter text-xs text-gray-400 hover:text-rose-gold transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="font-inter text-xs text-gray-400">Crafted with</span>
                        <span className="text-rose-gold">♥</span>
                        <span className="font-inter text-xs text-gray-400">for luxury</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
