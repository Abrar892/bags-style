'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
    { href: '#products', label: 'Collection' },
    { href: '#categories', label: 'Categories' },
    { href: '#testimonials', label: 'Stories' },
    { href: '#newsletter', label: 'Join Luxe' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (y) => {
            setIsScrolled(y > 50);
        });
        return unsubscribe;
    }, [scrollY]);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'glass-strong shadow-glass py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
                        <span
                            className="block w-7 h-7 rounded-full"
                            style={{
                                background: 'linear-gradient(135deg, #D4AF37, #B76E79)',
                            }}
                        />
                    </motion.div>
                    <span className="font-playfair text-xl font-bold tracking-wide text-charcoal group-hover:text-rose-gold transition-colors duration-300">
                         Bags <span className="text-gradient-gold">&amp; Style</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="font-inter text-sm font-medium tracking-widest text-charcoal/70 hover:text-rose-gold transition-colors duration-300 uppercase"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <motion.a
                        href="#products"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-6 py-2.5 rounded-full text-xs font-inter font-semibold tracking-widest text-white"
                        style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                            boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)',
                        }}
                    >
                        Shop Now
                    </motion.a>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-white/40 transition-colors"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-0.5 bg-charcoal origin-center transition-all"
                    />
                    <motion.span
                        animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="block w-6 h-0.5 bg-charcoal"
                    />
                    <motion.span
                        animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                        className="block w-6 h-0.5 bg-charcoal origin-center transition-all"
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden glass-strong"
            >
                <div className="px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-inter text-sm font-medium tracking-widest text-charcoal/70 hover:text-rose-gold transition-colors uppercase"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <motion.a
                        href="#products"
                        whileTap={{ scale: 0.96 }}
                        className="mt-2 px-6 py-3 rounded-full text-xs font-inter font-semibold tracking-widest text-white text-center"
                        style={{
                            background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                        }}
                    >
                        Shop Now
                    </motion.a>
                </div>
            </motion.div>
        </motion.nav>
    );
}
