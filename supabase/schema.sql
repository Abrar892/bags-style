-- ============================================================
-- Bags & Style — Supabase Reference Schema
-- Run this in your Supabase SQL editor if tables don't exist yet.
-- The user says tables already exist; use this only as reference.
-- ============================================================

-- products table (already exists per user)
CREATE TABLE IF NOT EXISTS products (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title           text NOT NULL,
    description     text NOT NULL,
    price           text NOT NULL,
    rating          numeric(3, 1),
    reviews_count   integer DEFAULT 0,
    image_url       text,
    redirect_url    text,
    category        text DEFAULT 'fashion',
    created_at      timestamptz DEFAULT now()
);

-- profiles table (already exists per user)
-- Must have a row for each Supabase Auth user.
-- The 'role' column must be 'admin' for admin access.
CREATE TABLE IF NOT EXISTS profiles (
    id      uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role    text NOT NULL DEFAULT 'user'
);

-- ── RLS Policies (reference only — adjust to match your setup) ──

-- Products: anyone can read
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products"
    ON products FOR SELECT
    USING (true);

CREATE POLICY "Admin can insert products"
    ON products FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admin can update products"
    ON products FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admin can delete products"
    ON products FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Profiles: users can only read their own row
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- ── Seed your admin user ──
-- 1. Create the user in Supabase Auth (Dashboard → Authentication → Users → Invite)
-- 2. Then run:
--    INSERT INTO profiles (id, role) VALUES ('<your-auth-user-uuid>', 'admin');
