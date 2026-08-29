import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

// Fetch directly from supabase
async function fetchPricesFromDb() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase
      .from('items')
      .select('id, price');
      
    if (error) {
      console.error("Error fetching prices from Supabase:", error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Error in fetchPricesFromDb:", error);
    return [];
  }
}

// Next.js cached function to ensure deduplication and caching across requests
export const getCurrentMenuItems = unstable_cache(
  fetchPricesFromDb,
  ['menu-prices'],
  { tags: ['menu-prices'], revalidate: 3600 }
);

export async function getLivePricesMap() {
  const items = await getCurrentMenuItems();
  const pricesMap = {};
  items.forEach(item => {
    pricesMap[item.id] = item.price;
  });
  return pricesMap;
}
