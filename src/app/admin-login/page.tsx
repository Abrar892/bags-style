'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

        if (authError) {
            setError('Invalid credentials. Please try again.');
            setLoading(false);
            return;
        }

        // Middleware will verify role; just redirect to /admin
        router.push('/admin');
        router.refresh();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4"
            style={{ background: 'linear-gradient(135deg, #FDE7E7 0%, #FFFFFF 50%, #FDF8EE 100%)' }}>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <span className="block w-7 h-7 rounded-full"
                            style={{ background: 'linear-gradient(135deg, #D4AF37, #B76E79)' }} />
                        <span className="font-playfair text-2xl font-bold tracking-wide text-charcoal">
                            Bags <span className="text-gradient-gold">&amp; Style</span>
                        </span>
                    </div>
                    <h1 className="font-playfair text-3xl font-semibold text-charcoal">Admin Access</h1>
                    <p className="font-inter text-sm text-gray-500 mt-2 tracking-wide">
                        Sign in to manage your collection
                    </p>
                </div>

                {/* Card */}
                <div className="glass-strong rounded-3xl p-8 shadow-glass-lg">
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-xs font-semibold tracking-widest uppercase text-charcoal/60">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-white/60 font-inter text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300/40 focus:border-rose-300 transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-inter text-xs font-semibold tracking-widest uppercase text-charcoal/60">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-white/60 font-inter text-sm text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-300/40 focus:border-rose-300 transition-all"
                            />
                        </div>

                        {error && (
                            <p className="text-xs font-inter text-red-500 text-center bg-red-50 rounded-xl py-2 px-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full py-3 rounded-full font-inter font-semibold text-sm tracking-widest text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                                background: 'linear-gradient(135deg, #D4AF37 0%, #C8A96E 50%, #B8933A 100%)',
                                boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)',
                            }}
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center font-inter text-xs text-gray-400 mt-6 tracking-wide">
                    Admin access only. Unauthorized attempts are logged.
                </p>
            </div>
        </div>
    );
}
