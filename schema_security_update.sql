-- Kardeşler Kebap Security Update SQL

-- 1. Add constraint to prevent negative or zero prices on database level
ALTER TABLE public.items
ADD CONSTRAINT price_must_be_positive CHECK (price > 0);

-- 2. Ensure price history constraints
ALTER TABLE public.price_history
ADD CONSTRAINT history_prices_must_be_positive CHECK (old_price > 0 AND new_price > 0);

-- 3. Confirm RLS is extremely strict on items
-- Drop old policies just to be safe and recreate them cleanly
DROP POLICY IF EXISTS "Owner update access items" ON public.items;
DROP POLICY IF EXISTS "Developer full access items" ON public.items;

-- Developer can do anything
CREATE POLICY "Developer full access items" ON public.items FOR ALL USING (get_user_role() = 'developer');

-- Owner can ONLY UPDATE items, and ONLY the price field (or is_available). 
-- Owner cannot INSERT or DELETE items.
CREATE POLICY "Owner update access items" ON public.items FOR UPDATE USING (get_user_role() = 'owner');
