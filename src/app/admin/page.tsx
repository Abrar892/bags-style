'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { DbProduct } from '@/lib/types';

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const productSchema = z.object({
    // Core fields (existing — unchanged)
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.string().min(1, 'Price is required'),
    rating: z.string().optional(),
    reviews_count: z.string().optional(),
    image_url: z.string().url('Must be a valid URL').or(z.literal('')),
    redirect_url: z.string().url('Must be a valid URL').or(z.literal('')),
    category: z.string().min(1, 'Category is required'),
    // New optional fields (stored as plain text, parsed before saving)
    short_summary: z.string().optional(),
    key_features: z.string().optional(),       // newline-separated list
    specifications: z.string().optional(),     // "Key: Value" per line
    pros: z.string().optional(),               // newline-separated list
    cons: z.string().optional(),               // newline-separated list
    faq: z.string().optional(),                // Q: ...\nA: ... blocks
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

// ─── Parse helpers ─────────────────────────────────────────────────────────

function parseLines(text: string | undefined): string[] | null {
    if (!text?.trim()) return null;
    return text.split('\n').map(l => l.trim()).filter(Boolean);
}

function parseSpecs(text: string | undefined): Record<string, string> | null {
    if (!text?.trim()) return null;
    const obj: Record<string, string> = {};
    text.split('\n').forEach(line => {
        const idx = line.indexOf(':');
        if (idx > 0) {
            obj[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
        }
    });
    return Object.keys(obj).length ? obj : null;
}

function parseFaq(text: string | undefined): { question: string; answer: string }[] | null {
    if (!text?.trim()) return null;
    const items: { question: string; answer: string }[] = [];
    const blocks = text.split(/\n(?=Q:)/i);
    blocks.forEach(block => {
        const qMatch = block.match(/^Q:\s*(.+)/im);
        const aMatch = block.match(/^A:\s*([\s\S]+)/im);
        if (qMatch && aMatch) {
            items.push({ question: qMatch[1].trim(), answer: aMatch[1].trim() });
        }
    });
    return items.length ? items : null;
}

// ─── Reverse parse for edit defaults ──────────────────────────────────────

function linesToText(arr: string[] | null | undefined): string {
    return arr?.join('\n') ?? '';
}
function specsToText(obj: Record<string, string> | null | undefined): string {
    if (!obj) return '';
    return Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join('\n');
}
function faqToText(faq: { question: string; answer: string }[] | null | undefined): string {
    if (!faq) return '';
    return faq.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
}

// ─── Shared input styles ──────────────────────────────────────────────────

const inp = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:border-indigo-400 transition-all';

// ─── Collapsible section ──────────────────────────────────────────────────

function CollapsibleSection({ title, children, hint }: { title: string; children: React.ReactNode; hint?: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="sm:col-span-2 border border-slate-200 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
                <div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{title}</span>
                    {hint && <span className="ml-2 text-xs text-slate-400 font-normal normal-case tracking-normal">{hint}</span>}
                </div>
                <span className="text-slate-400 text-lg transition-transform duration-200" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
            </button>
            {open && <div className="px-4 py-4 bg-white space-y-3">{children}</div>}
        </div>
    );
}

// ─── Product Form ─────────────────────────────────────────────────────────

function ProductForm({
    initial,
    onSave,
    onCancel,
}: {
    initial?: DbProduct;
    onSave: () => void;
    onCancel: () => void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initial
            ? {
                title: initial.title,
                description: initial.description,
                price: initial.price,
                rating: initial.rating != null ? String(initial.rating) : '',
                reviews_count: initial.reviews_count != null ? String(initial.reviews_count) : '',
                image_url: initial.image_url ?? '',
                redirect_url: initial.redirect_url ?? '',
                category: initial.category ?? 'fashion',
                short_summary: initial.short_summary ?? '',
                key_features: linesToText(initial.key_features),
                specifications: specsToText(initial.specifications),
                pros: linesToText(initial.pros),
                cons: linesToText(initial.cons),
                faq: faqToText(initial.faq),
                seo_title: initial.seo_title ?? '',
                seo_description: initial.seo_description ?? '',
            }
            : { category: 'fashion', rating: '', reviews_count: '' },
    });

    const onSubmit = async (values: ProductFormData) => {
        const ratingNum = values.rating ? parseFloat(values.rating) : null;
        const reviewsNum = values.reviews_count ? parseInt(values.reviews_count, 10) : null;

        const payload = {
            title: values.title,
            description: values.description,
            price: values.price,
            rating: ratingNum !== null && !isNaN(ratingNum) ? ratingNum : null,
            reviews_count: reviewsNum !== null && !isNaN(reviewsNum) ? reviewsNum : null,
            image_url: values.image_url || null,
            redirect_url: values.redirect_url || null,
            category: values.category,
            // Optional enrichment fields
            short_summary: values.short_summary?.trim() || null,
            key_features: parseLines(values.key_features),
            specifications: parseSpecs(values.specifications),
            pros: parseLines(values.pros),
            cons: parseLines(values.cons),
            faq: parseFaq(values.faq),
            seo_title: values.seo_title?.trim() || null,
            seo_description: values.seo_description?.trim() || null,
        };

        const url = initial ? `/api/products/${initial.id}` : '/api/products';
        const method = initial ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            onSave();
        } else {
            const data = await res.json();
            alert(data.error ?? 'Something went wrong');
        }
    };

    const fe = (field: keyof ProductFormData) =>
        errors[field] ? (
            <p className="text-xs text-red-500 mt-1">{String(errors[field]?.message)}</p>
        ) : null;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* ── Core fields (unchanged) ── */}
            <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Title *</label>
                <input {...register('title')} placeholder="Product title" className={inp} />
                {fe('title')}
            </div>

            <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description *</label>
                <textarea {...register('description')} placeholder="Product description" rows={3} className={`${inp} resize-none`} />
                {fe('description')}
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Price *</label>
                <input {...register('price')} placeholder="e.g. $185" className={inp} />
                {fe('price')}
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category *</label>
                <select {...register('category')} className={inp}>
                    <option value="fashion">Fashion</option>
                    <option value="beauty">Beauty</option>
                    <option value="accessories">Accessories</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
                {fe('category')}
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Rating (0–5)</label>
                <input {...register('rating')} type="number" step="0.1" min="0" max="5" placeholder="4.9" className={inp} />
                {fe('rating')}
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reviews Count</label>
                <input {...register('reviews_count')} type="number" min="0" placeholder="342" className={inp} />
                {fe('reviews_count')}
            </div>

            <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Image URL</label>
                <input {...register('image_url')} placeholder="https://..." className={inp} />
                {fe('image_url')}
            </div>

            <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Redirect URL (Affiliate link)</label>
                <input {...register('redirect_url')} placeholder="https://..." className={inp} />
                {fe('redirect_url')}
            </div>

            {/* ── Optional enrichment sections ── */}

            <CollapsibleSection title="Short Summary" hint="— one-line intro shown on detail page">
                <textarea {...register('short_summary')} placeholder="One compelling sentence about this product…" rows={2} className={`${inp} resize-none`} />
            </CollapsibleSection>

            <CollapsibleSection title="Key Features" hint="— one feature per line">
                <p className="text-xs text-slate-400 mb-1">Enter one feature per line</p>
                <textarea {...register('key_features')} placeholder={"Genuine Italian leather\nGold-plated hardware\nFits 15″ laptop"} rows={5} className={`${inp} resize-none font-mono text-xs`} />
            </CollapsibleSection>

            <CollapsibleSection title="Specifications" hint="— Key: Value, one per line">
                <p className="text-xs text-slate-400 mb-1">Format: <code className="bg-slate-100 px-1 rounded">Material: Full-grain leather</code></p>
                <textarea {...register('specifications')} placeholder={"Material: Full-grain leather\nDimensions: 38 × 28 × 12 cm\nWeight: 1.2 kg"} rows={5} className={`${inp} resize-none font-mono text-xs`} />
            </CollapsibleSection>

            <CollapsibleSection title="Pros" hint="— one per line">
                <textarea {...register('pros')} placeholder={"Exceptional build quality\nTimeless design\nSpacious interior"} rows={4} className={`${inp} resize-none font-mono text-xs`} />
            </CollapsibleSection>

            <CollapsibleSection title="Cons" hint="— one per line">
                <textarea {...register('cons')} placeholder={"Premium price point\nLimited colour options"} rows={4} className={`${inp} resize-none font-mono text-xs`} />
            </CollapsibleSection>

            <CollapsibleSection title="FAQ" hint="— Q: … / A: … blocks">
                <p className="text-xs text-slate-400 mb-1">Format each pair as:<br /><code className="bg-slate-100 px-1 rounded">Q: Question here</code><br /><code className="bg-slate-100 px-1 rounded">A: Answer here</code></p>
                <textarea
                    {...register('faq')}
                    placeholder={"Q: Is this bag water resistant?\nA: Yes, the leather has a protective coating.\n\nQ: What is the return policy?\nA: Amazon standard 30-day return policy applies."}
                    rows={7}
                    className={`${inp} resize-none font-mono text-xs`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="SEO" hint="— title & meta description">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">SEO Title</label>
                    <input {...register('seo_title')} placeholder="Best Leather Bag 2024 — Bags & Style" className={inp} />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">SEO Description</label>
                    <textarea {...register('seo_description')} placeholder="Concise meta description (max 160 chars)…" rows={2} className={`${inp} resize-none`} />
                </div>
            </CollapsibleSection>

            {/* Actions */}
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={onCancel} className="px-5 py-2 rounded-full text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-2 rounded-full text-sm font-semibold text-white transition-all disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)', boxShadow: '0 4px 16px rgba(212,175,55,0.35)' }}
                >
                    {isSubmitting ? 'Saving…' : initial ? 'Save Changes' : 'Add Product'}
                </button>
            </div>
        </form>
    );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

export default function AdminPage() {
    const router = useRouter();
    const [products, setProducts] = useState<DbProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState<DbProduct | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this product? This cannot be undone.')) return;
        setDeletingId(id);
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setProducts((p) => p.filter((x) => x.id !== id));
        } else {
            alert('Delete failed');
        }
        setDeletingId(null);
    };

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/admin-login');
        router.refresh();
    };

    const handleFormSave = () => {
        setShowForm(false);
        setEditProduct(null);
        fetchProducts();
    };

    const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full block" style={{ background: 'linear-gradient(135deg, #D4AF37, #B76E79)' }} />
                        <span className="font-playfair text-lg font-bold text-slate-800">
                            Bags <span className="text-gradient-gold">&amp; Style</span>{' '}
                            <span className="font-inter text-xs font-normal text-slate-400 ml-1">Admin</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
                            View Site ↗
                        </a>
                        <button onClick={handleLogout} className="px-4 py-1.5 rounded-full text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all">
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Total Products', value: products.length },
                        { label: 'Fashion', value: products.filter((p) => p.category === 'fashion').length },
                        { label: 'Beauty & Lifestyle', value: products.filter((p) => ['beauty', 'lifestyle', 'accessories'].includes(p.category ?? '')).length },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <p className="text-xs font-inter text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="font-playfair text-3xl font-bold text-slate-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Search products…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`${inp} max-w-xs`}
                    />
                    <button
                        onClick={() => { setShowForm(true); setEditProduct(null); }}
                        className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
                        style={{ background: 'linear-gradient(135deg, #B76E79, #9B5066)', boxShadow: '0 4px 16px rgba(183,110,121,0.35)' }}
                    >
                        + Add Product
                    </button>
                </div>

                {/* Add / Edit Form */}
                {(showForm || editProduct) && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
                        <h2 className="font-playfair text-lg font-semibold text-slate-800 mb-5">
                            {editProduct ? `Editing: ${editProduct.title}` : 'New Product'}
                        </h2>
                        <ProductForm
                            initial={editProduct ?? undefined}
                            onSave={handleFormSave}
                            onCancel={() => { setShowForm(false); setEditProduct(null); }}
                        />
                    </div>
                )}

                {/* Products Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="font-playfair text-base font-semibold text-slate-800">
                            Products <span className="font-inter text-xs text-slate-400 font-normal">({filtered.length} shown)</span>
                        </h2>
                        {loading && <span className="text-xs text-slate-400 font-inter animate-pulse">Loading…</span>}
                    </div>

                    {!loading && filtered.length === 0 && (
                        <div className="py-16 text-center text-slate-400 font-inter text-sm">
                            {searchQuery ? 'No products match your search.' : 'No products yet. Add your first one above.'}
                        </div>
                    )}

                    {filtered.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                                        <th className="px-6 py-3 text-left">Product</th>
                                        <th className="px-4 py-3 text-left">Category</th>
                                        <th className="px-4 py-3 text-left">Price</th>
                                        <th className="px-4 py-3 text-left">Rating</th>
                                        <th className="px-4 py-3 text-left">Slug</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {product.image_url ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={product.image_url} alt={product.title} className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0" />
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-slate-800 truncate max-w-[180px]">{product.title}</p>
                                                        <p className="text-xs text-slate-400 truncate max-w-[180px]">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">{product.category ?? '—'}</span>
                                            </td>
                                            <td className="px-4 py-4 font-semibold text-slate-700">{product.price}</td>
                                            <td className="px-4 py-4 text-slate-500">
                                                {product.rating != null ? `${product.rating} ★ (${product.reviews_count ?? 0})` : '—'}
                                            </td>
                                            <td className="px-4 py-4">
                                                {product.slug ? (
                                                    <a href={`/products/${product.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 hover:underline truncate max-w-[140px] block">
                                                        /{product.slug}
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-300 text-xs">—</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => { setEditProduct(product); setShowForm(false); }}
                                                        className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-amber-200 text-amber-700 hover:bg-amber-50 transition-all"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        disabled={deletingId === product.id}
                                                        className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                                                    >
                                                        {deletingId === product.id ? '…' : 'Delete'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
