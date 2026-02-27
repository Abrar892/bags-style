'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Product, products as defaultProducts } from '@/lib/data';

const STORAGE_KEY = 'yasir_luxe_products';

export default function AdminPanel() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<Product>>({});
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
        setProducts(stored ? JSON.parse(stored) : defaultProducts);
    }, []);

    const save = (updated: Product[]) => {
        setProducts(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setForm(product);
        setShowAddForm(false);
    };

    const handleSave = () => {
        if (!form.name || !form.price) return;
        if (editingId) {
            save(products.map((p) => (p.id === editingId ? { ...p, ...form } as Product : p)));
            setEditingId(null);
        } else {
            const newProduct: Product = {
                id: Date.now().toString(),
                name: form.name || '',
                price: form.price || '',
                description: form.description || '',
                category: form.category || 'fashion',
                imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=90',
                affiliateUrl: form.affiliateUrl || '#',
                badge: form.badge,
                originalPrice: form.originalPrice,
                rating: form.rating,
                reviews: form.reviews,
            };
            save([...products, newProduct]);
            setShowAddForm(false);
        }
        setForm({});
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this product?')) {
            save(products.filter((p) => p.id !== id));
        }
    };

    const handleReset = () => {
        if (window.confirm('Reset to default products?')) {
            localStorage.removeItem(STORAGE_KEY);
            setProducts(defaultProducts);
        }
    };

    const inputClass =
        'w-full px-3 py-2 text-sm rounded-xl border border-rose-100 bg-white/60 font-inter text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold/50';

    const FormFields = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <input placeholder="Product Name*" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            <input placeholder="Price (e.g. $185)*" value={form.price || ''} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
            <input placeholder="Original Price (optional)" value={form.originalPrice || ''} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className={inputClass} />
            <select value={form.category || 'fashion'} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
                <option value="fashion">Fashion</option>
                <option value="beauty">Beauty</option>
                <option value="accessories">Accessories</option>
                <option value="lifestyle">Lifestyle</option>
            </select>
            <input placeholder="Affiliate URL*" value={form.affiliateUrl || ''} onChange={(e) => setForm({ ...form, affiliateUrl: e.target.value })} className={`${inputClass} sm:col-span-2`} />
            <input placeholder="Image URL" value={form.imageUrl || ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={`${inputClass} sm:col-span-2`} />
            <textarea placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} sm:col-span-2 resize-none h-20`} />
            <input placeholder="Badge (e.g. New, Bestseller)" value={form.badge || ''} onChange={(e) => setForm({ ...form, badge: e.target.value })} className={inputClass} />
            <input placeholder="Rating (e.g. 4.9)" type="number" step="0.1" min="0" max="5" value={form.rating || ''} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })} className={inputClass} />
            <div className="sm:col-span-2 flex gap-3 justify-end">
                <button onClick={() => { setEditingId(null); setShowAddForm(false); setForm({}); }} className="px-4 py-2 text-xs font-inter rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2 text-xs font-inter font-semibold rounded-full text-white" style={{ background: 'linear-gradient(135deg, #D4AF37, #B8933A)' }}>
                    {editingId ? 'Save Changes' : 'Add Product'}
                </button>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95vw] max-w-4xl"
        >
            <div className="glass-strong rounded-3xl shadow-glass-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full animate-pulse-soft" style={{ background: '#D4AF37' }} />
                        <h2 className="font-playfair text-base font-semibold text-charcoal">Admin Mode</h2>
                        <span className="px-2 py-0.5 text-xs font-inter bg-rose-50 text-rose-gold rounded-full border border-rose-100">{products.length} products</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleReset} className="px-4 py-1.5 text-xs font-inter text-gray-400 hover:text-gray-600 border border-gray-200 rounded-full hover:bg-gray-50 transition-all">Reset</button>
                        <button onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); setForm({}); }} className="px-5 py-1.5 text-xs font-inter font-semibold text-white rounded-full transition-all" style={{ background: 'linear-gradient(135deg, #B76E79, #9B5066)' }}>
                            {showAddForm ? 'Cancel' : '+ Add Product'}
                        </button>
                    </div>
                </div>

                {/* Panel body in scrollable area */}
                <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                    {/* Add form */}
                    {showAddForm && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 pb-4 border-b border-rose-100">
                            <h3 className="font-inter text-sm font-semibold text-charcoal">New Product</h3>
                            <FormFields />
                        </motion.div>
                    )}

                    {/* Product list */}
                    <div className="space-y-3">
                        {products.map((product) => (
                            <div key={product.id} className="rounded-2xl bg-white/50 border border-rose-50 p-4">
                                {editingId === product.id ? (
                                    <div>
                                        <h4 className="font-inter text-xs font-semibold text-charcoal mb-1">Editing: {product.name}</h4>
                                        <FormFields />
                                    </div>
                                ) : (
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="font-playfair text-sm font-semibold text-charcoal truncate">{product.name}</span>
                                                {product.badge && <span className="px-2 py-0.5 text-xs font-inter bg-rose-50 text-rose-gold rounded-full border border-rose-100">{product.badge}</span>}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="font-inter text-xs text-amber-warm font-medium">{product.price}</span>
                                                <span className="font-inter text-xs text-gray-400 capitalize">{product.category}</span>
                                                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="font-inter text-xs text-blue-400 hover:underline truncate max-w-[160px]">{product.affiliateUrl}</a>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button onClick={() => handleEdit(product)} className="px-4 py-1.5 text-xs font-inter rounded-full border border-rose-200 text-rose-gold hover:bg-rose-50 transition-all">Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="px-4 py-1.5 text-xs font-inter rounded-full border border-red-200 text-red-400 hover:bg-red-50 transition-all">Delete</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
