'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DbProduct } from '@/lib/types';
import { generateSlug } from '@/lib/utils';

// ─── Star Rating ──────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} viewBox="0 0 20 20" className="w-4 h-4" style={{ color: i <= Math.round(rating) ? '#D4AF37' : '#e5e7eb', fill: 'currentColor' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-stone-50 transition-colors"
            >
                <span className="font-inter font-semibold text-sm text-stone-800 pr-4">{q}</span>
                <span className="text-amber-600 text-lg flex-shrink-0 transition-transform duration-300" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        <div className="px-6 py-4 text-sm text-stone-600 leading-relaxed border-t border-stone-100 font-inter bg-stone-50/50">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Related Product Mini-Card ────────────────────────────────────────────────

function RelatedCard({ product }: { product: DbProduct }) {
    const slug = product.slug || generateSlug(product.title);
    return (
        <Link href={`/products/${slug}`} className="group flex flex-col bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                {product.image_url ? (
                    <Image src={product.image_url} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 50vw, 25vw" />
                ) : (
                    <div className="w-full h-full bg-stone-100" />
                )}
            </div>
            <div className="p-4">
                <p className="font-inter text-xs text-amber-700 uppercase tracking-widest mb-1">{product.category}</p>
                <h4 className="font-playfair text-sm font-semibold text-stone-800 line-clamp-2 leading-snug">{product.title}</h4>
                <p className="font-playfair text-base font-bold text-stone-900 mt-2">{product.price}</p>
            </div>
        </Link>
    );
}

// ─── Buy Button ───────────────────────────────────────────────────────────────

function BuyButton({ href, large = false }: { href: string; large?: boolean }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center justify-center gap-2 rounded-full font-inter font-bold tracking-wider text-white transition-all ${large ? 'px-10 py-4 text-sm' : 'px-6 py-3 text-xs'}`}
            style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                boxShadow: '0 8px 32px rgba(212,175,55,0.45)',
            }}
        >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z" /></svg>
            Buy on Amazon
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </motion.a>
    );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
        >
            <h2 className="font-playfair text-2xl font-semibold text-stone-900 mb-5 pb-3 border-b border-stone-200">
                {title}
            </h2>
            {children}
        </motion.section>
    );
}

// ─── Main Client Component ────────────────────────────────────────────────────

interface Props {
    product: DbProduct;
    related: DbProduct[];
    slug: string;
}

export default function ProductDetailClient({ product, related, slug }: Props) {
    const hasFeatures = product.key_features && product.key_features.length > 0;
    const hasSpecs = product.specifications && Object.keys(product.specifications).length > 0;
    const hasPros = product.pros && product.pros.length > 0;
    const hasCons = product.cons && product.cons.length > 0;
    const hasFaq = product.faq && product.faq.length > 0;
    const hasRelated = related.length > 0;
    const affiliateUrl = product.redirect_url ?? '#';
    const categoryLabel = product.category
        ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
        : 'Products';

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FDE7E7 0%, #FFFFFF 40%, #FDF8EE 100%)' }}>

            {/* ── Navbar placeholder keeps layout consistent ── */}
            <div className="h-20" />

            {/* ── Breadcrumbs ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
                <nav className="flex items-center gap-2 text-xs font-inter text-stone-500">
                    <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
                    <span className="text-stone-300">›</span>
                    <Link href={`/#products`} className="hover:text-amber-700 transition-colors capitalize">{categoryLabel}</Link>
                    <span className="text-stone-300">›</span>
                    <span className="text-stone-700 font-medium truncate max-w-[200px]">{product.title}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

                {/* ════════════════════════════════════════
                    HERO — Image + Core Info
                ════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl bg-white"
                        style={{ aspectRatio: '1/1' }}
                    >
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width:1024px) 100vw, 50vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                                <span className="text-stone-400 text-4xl">✦</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="flex flex-col justify-center"
                    >
                        {/* Category badge */}
                        <span
                            className="inline-flex self-start px-3 py-1 rounded-full text-xs font-inter font-semibold tracking-widest uppercase text-white mb-4"
                            style={{ background: 'linear-gradient(135deg, #B76E79, #9B5066)' }}
                        >
                            {product.category}
                        </span>

                        {/* Title */}
                        <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-4">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        {product.rating != null && (
                            <div className="flex items-center gap-3 mb-4">
                                <Stars rating={product.rating} />
                                <span className="font-inter text-sm font-semibold text-stone-700">{product.rating}</span>
                                {product.reviews_count != null && (
                                    <span className="font-inter text-sm text-stone-500">
                                        ({product.reviews_count.toLocaleString()} reviews)
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-5">
                            <span className="font-playfair text-4xl font-bold text-stone-900">{product.price}</span>
                        </div>

                        {/* Short summary */}
                        {product.short_summary && (
                            <p className="font-inter text-base text-stone-600 leading-relaxed mb-6 border-l-4 pl-4 italic" style={{ borderColor: '#D4AF37' }}>
                                {product.short_summary}
                            </p>
                        )}

                        {/* Primary CTA */}
                        <div className="mb-6">
                            <BuyButton href={affiliateUrl} large />
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: '🔒', label: 'Secure Checkout' },
                                { icon: '↩️', label: 'Easy Returns' },
                                { icon: '⚡', label: 'Fast Delivery' },
                                { icon: '✓', label: 'Amazon Verified' },
                            ].map((b) => (
                                <div key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-stone-200 text-xs font-inter text-stone-600 shadow-sm">
                                    <span>{b.icon}</span>
                                    <span>{b.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ════════════════════════════════════════
                    CONTENT SECTIONS
                ════════════════════════════════════════ */}

                {/* About */}
                <Section title="About This Product">
                    <p className="font-inter text-base text-stone-600 leading-relaxed whitespace-pre-line">
                        {product.description}
                    </p>
                </Section>

                {/* Key Features */}
                {hasFeatures && (
                    <Section title="Key Features">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {product.key_features!.map((f, i) => (
                                <li key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ background: 'linear-gradient(135deg, #D4AF37, #B8933A)' }}>✓</span>
                                    <span className="font-inter text-sm text-stone-700 leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </Section>
                )}

                {/* Specifications */}
                {hasSpecs && (
                    <Section title="Specifications">
                        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                            <table className="w-full text-sm">
                                <tbody>
                                    {Object.entries(product.specifications!).map(([key, val], i) => (
                                        <tr key={key} className={i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                                            <td className="px-5 py-3 font-inter font-semibold text-stone-700 w-2/5 border-r border-stone-100">{key}</td>
                                            <td className="px-5 py-3 font-inter text-stone-600">{val}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Section>
                )}

                {/* Pros & Cons */}
                {(hasPros || hasCons) && (
                    <Section title="Pros &amp; Cons">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {hasPros && (
                                <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
                                    <h3 className="font-inter font-bold text-emerald-800 text-sm uppercase tracking-widest mb-3">✓ Pros</h3>
                                    <ul className="space-y-2">
                                        {product.pros!.map((p, i) => (
                                            <li key={i} className="flex items-start gap-2 font-inter text-sm text-emerald-900">
                                                <span className="text-emerald-500 mt-0.5 flex-shrink-0">●</span>{p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {hasCons && (
                                <div className="bg-rose-50 rounded-2xl border border-rose-200 p-5">
                                    <h3 className="font-inter font-bold text-rose-800 text-sm uppercase tracking-widest mb-3">✕ Cons</h3>
                                    <ul className="space-y-2">
                                        {product.cons!.map((c, i) => (
                                            <li key={i} className="flex items-start gap-2 font-inter text-sm text-rose-900">
                                                <span className="text-rose-400 mt-0.5 flex-shrink-0">●</span>{c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Section>
                )}

                {/* FAQ */}
                {hasFaq && (
                    <Section title="Frequently Asked Questions">
                        <div className="space-y-3">
                            {product.faq!.map((item, i) => (
                                <FaqItem key={i} q={item.question} a={item.answer} />
                            ))}
                        </div>
                    </Section>
                )}

                {/* Mid-page CTA */}
                <div className="my-12 flex flex-col items-center gap-4 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm text-center">
                    <p className="font-playfair text-2xl font-semibold text-stone-900">Ready to get yours?</p>
                    <p className="font-inter text-sm text-stone-500 max-w-md">Purchase securely through Amazon with fast shipping and easy returns.</p>
                    <BuyButton href={affiliateUrl} large />
                </div>

                {/* Related Products */}
                {hasRelated && (
                    <Section title="You May Also Like">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {related.map((p) => <RelatedCard key={p.id} product={p} />)}
                        </div>
                    </Section>
                )}
            </div>

            {/* ── Sticky Buy Button (mobile) ── */}
            <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-sm border-t border-stone-200 px-4 py-3 flex items-center justify-between gap-4">
                <div>
                    <p className="font-playfair text-base font-bold text-stone-900">{product.price}</p>
                    <p className="font-inter text-xs text-stone-500 line-clamp-1">{product.title}</p>
                </div>
                <BuyButton href={affiliateUrl} />
            </div>
        </div>
    );
}
