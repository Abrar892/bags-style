'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

// ─── Zod Schema ────────────────────────────────────────────────────────────────
// rating and reviews_count are strings in the form — HTML <input type="number">
// still returns a string. We convert to numbers only in onSubmit.

const productSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.string().min(1, 'Price is required'),
    rating: z.string().optional(),
    reviews_count: z.string().optional(),
    image_url: z.string().url('Must be a valid URL').or(z.literal('')),
    redirect_url: z.string().url('Must be a valid URL').or(z.literal('')),
    category: z.string().min(1, 'Category is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

// ─── DB Row type ───────────────────────────────────────────────────────────────

interface DbProduct {
    id: string;
    title: string;
    description: string;
    price: string;
    rating?: number;
    reviews_count?: number;
    image_url?: string;
    redirect_url?: string;
    category?: string;
    created_at: string;
}

// ─── Input class ───────────────────────────────────────────────────────────────

const inp =
    'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:border-indigo-400 transition-all';

// ─── Product Form ─────────────────────────────────────────────────────────────

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
            {/* Title */}
            <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Title *</label>
                <input {...register('title')} placeholder="Product title" className={inp} />
                {fe('title')}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description *</label>
                <textarea
                    {...register('description')}
                    placeholder="Product description"
                    rows={3}
                    className={`${inp} resize-none`}
                />
                {fe('description')}
            </div>

            {/* Price */}
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Price *</label>
                <input {...register('price')} placeholder="e.g. $185" className={inp} />
                {fe('price')}
            </div>

            {/* Category */}
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

            {/* Rating */}
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Rating (0–5)</label>
                <input {...register('rating')} type="number" step="0.1" min="0" max="5" placeholder="4.9" className={inp} />
                {fe('rating')}
            </div>

            {/* Reviews Count */}
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reviews Count</label>
                <input {...register('reviews_count')} type="number" min="0" placeholder="342" className={inp} />
                {fe('reviews_count')}
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Image URL</label>
                <input {...register('image_url')} placeholder="https://..." className={inp} />
                {fe('image_url')}
            </div>

            {/* Redirect URL */}
            <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Redirect URL (Affiliate link)</label>
                <input {...register('redirect_url')} placeholder="https://..." className={inp} />
                {fe('redirect_url')}
            </div>

            {/* Actions */}
            <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 rounded-full text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-2 rounded-full text-sm font-semibold text-white transition-all disabled:opacity-60"
                    style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                        boxShadow: '0 4px 16px rgba(212,175,55,0.35)',
                    }}
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
        router.push('/admin/login');
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
            {/* ── Header ── */}
            <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span
                            className="w-7 h-7 rounded-full block"
                            style={{ background: 'linear-gradient(135deg, #D4AF37, #B76E79)' }}
                        />
                        <span className="font-playfair text-lg font-bold text-slate-800">
                            Bags{' '}
                            <span className="text-gradient-gold">&amp; Style</span>{' '}
                            <span className="font-inter text-xs font-normal text-slate-400 ml-1">
                                Admin
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex px-4 py-1.5 rounded-full text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
                        >
                            View Site ↗
                        </a>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1.5 rounded-full text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* ── Stats ── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Total Products', value: products.length },
                        { label: 'Fashion', value: products.filter((p) => p.category === 'fashion').length },
                        {
                            label: 'Beauty & Lifestyle',
                            value: products.filter((p) =>
                                ['beauty', 'lifestyle', 'accessories'].includes(p.category ?? '')
                            ).length,
                        },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                            <p className="text-xs font-inter text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="font-playfair text-3xl font-bold text-slate-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* ── Toolbar ── */}
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
                        style={{
                            background: 'linear-gradient(135deg, #B76E79, #9B5066)',
                            boxShadow: '0 4px 16px rgba(183,110,121,0.35)',
                        }}
                    >
                        + Add Product
                    </button>
                </div>

                {/* ── Add / Edit Form ── */}
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

                {/* ── Products Table ── */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="font-playfair text-base font-semibold text-slate-800">
                            Products{' '}
                            <span className="font-inter text-xs text-slate-400 font-normal">
                                ({filtered.length} shown)
                            </span>
                        </h2>
                        {loading && (
                            <span className="text-xs text-slate-400 font-inter animate-pulse">Loading…</span>
                        )}
                    </div>

                    {!loading && filtered.length === 0 && (
                        <div className="py-16 text-center text-slate-400 font-inter text-sm">
                            {searchQuery
                                ? 'No products match your search.'
                                : 'No products yet. Add your first one above.'}
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
                                        <th className="px-4 py-3 text-left">Redirect URL</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filtered.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                                            {/* Product */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {product.image_url ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.title}
                                                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0" />
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-slate-800 truncate max-w-[180px]">
                                                            {product.title}
                                                        </p>
                                                        <p className="text-xs text-slate-400 truncate max-w-[180px]">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* Category */}
                                            <td className="px-4 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">
                                                    {product.category ?? '—'}
                                                </span>
                                            </td>
                                            {/* Price */}
                                            <td className="px-4 py-4 font-semibold text-slate-700">
                                                {product.price}
                                            </td>
                                            {/* Rating */}
                                            <td className="px-4 py-4 text-slate-500">
                                                {product.rating != null
                                                    ? `${product.rating} ★ (${product.reviews_count ?? 0})`
                                                    : '—'}
                                            </td>
                                            {/* URL */}
                                            <td className="px-4 py-4">
                                                {product.redirect_url ? (
                                                    <a
                                                        href={product.redirect_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-indigo-500 hover:underline truncate max-w-[140px] block"
                                                    >
                                                        {product.redirect_url}
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-300 text-xs">—</span>
                                                )}
                                            </td>
                                            {/* Actions */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditProduct(product);
                                                            setShowForm(false);
                                                        }}
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
