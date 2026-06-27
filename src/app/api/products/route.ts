import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { generateSlug } from '@/lib/utils';

// GET /api/products — public, returns all products ordered by created_at desc
export async function GET() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

// POST /api/products — admin only
export async function POST(request: Request) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!profile || profile.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    // Auto-generate slug from title if not already provided
    if (!body.slug && body.title) {
        const baseSlug = generateSlug(body.title);
        // Ensure uniqueness by appending a short timestamp suffix if slug exists
        const { data: existing } = await supabase
            .from('products')
            .select('id')
            .eq('slug', baseSlug)
            .maybeSingle();
        body.slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;
    }

    const { data, error } = await supabase
        .from('products')
        .insert([body])
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
}
