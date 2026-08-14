-- Kardeşler Kebap Supabase Setup SQL

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE public.categories (
    id TEXT PRIMARY KEY,
    name_tr TEXT,
    name_en TEXT,
    order_index INTEGER DEFAULT 0
);

-- Create items table
CREATE TABLE public.items (
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES public.categories(id) ON DELETE CASCADE,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    tags TEXT[],
    is_trending BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE
);

-- Create price_history table
CREATE TABLE public.price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id TEXT REFERENCES public.items(id) ON DELETE CASCADE,
    old_price NUMERIC(10, 2) NOT NULL,
    new_price NUMERIC(10, 2) NOT NULL,
    modified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access
CREATE POLICY "Enable read access for all users on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users on items" ON public.items FOR SELECT USING (true);

-- Helper function to get user role from metadata
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claims', true)::json->'user_metadata'->>'role',
    'user'
  );
$$ LANGUAGE SQL STABLE;

-- 2. Developer Access (Full Access)
CREATE POLICY "Developer full access categories" ON public.categories FOR ALL USING (get_user_role() = 'developer');
CREATE POLICY "Developer full access items" ON public.items FOR ALL USING (get_user_role() = 'developer');
CREATE POLICY "Developer full access price_history" ON public.price_history FOR ALL USING (get_user_role() = 'developer');

-- 3. Owner Access (Update Items, Insert History)
CREATE POLICY "Owner update access items" ON public.items FOR UPDATE USING (get_user_role() = 'owner');
CREATE POLICY "Owner insert price_history" ON public.price_history FOR INSERT WITH CHECK (get_user_role() = 'owner');

-- Create dummy users (Run these manually or via API)
-- developer@kardesler.com
-- owner@kardesler.com
-- (Make sure to update their user_metadata = '{"role": "developer"}' and '{"role": "owner"}' via Supabase dashboard after creation)
