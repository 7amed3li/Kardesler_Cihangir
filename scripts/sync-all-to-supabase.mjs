import WebSocket from 'ws';
globalThis.WebSocket = WebSocket;

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const categoryDefinitions = [
  { id: 'kahvalti', name_tr: 'Kahvaltı', name_en: 'Breakfast', order_index: 0 },
  { id: 'kebap', name_tr: 'Kebaplar', name_en: 'Kebabs', order_index: 1 },
  { id: 'ozel_menu', name_tr: 'Özel Menü', name_en: 'Special Menu', order_index: 2 },
  { id: 'mezeli_kebaplar', name_tr: 'Mezeli Kebaplar', name_en: 'Kebabs with Appetizers', order_index: 3 },
  { id: 'durumler', name_tr: 'Dürümler', name_en: 'Wraps', order_index: 4 },
  { id: 'pide', name_tr: 'Pideler', name_en: 'Pitas', order_index: 5 },
  { id: 'lahmacun', name_tr: 'Lahmacun', name_en: 'Lahmacun', order_index: 6 },
  { id: 'meze', name_tr: 'Mezeler', name_en: 'Appetizers', order_index: 7 },
  { id: 'salata', name_tr: 'Salatalar & Ara Sıcaklar', name_en: 'Salads & Hot Starters', order_index: 8 },
  { id: 'tatli', name_tr: 'Tatlılar', name_en: 'Desserts', order_index: 9 },
  { id: 'soguk_icecek', name_tr: 'Soğuk İçecekler', name_en: 'Cold Drinks', order_index: 10 },
  { id: 'sicak_icecek', name_tr: 'Sıcak İçecekler', name_en: 'Hot Drinks', order_index: 11 },
];

async function syncAll() {
  console.log('--- STEP 1: Syncing Categories ---');
  for (const cat of categoryDefinitions) {
    const { error } = await supabase
      .from('categories')
      .upsert(cat, { onConflict: 'id' });
    if (error) {
      console.error(`Error upserting category ${cat.id}:`, error);
    } else {
      console.log(`✓ Category synced: ${cat.id} (${cat.name_tr})`);
    }
  }

  console.log('\n--- STEP 2: Loading menuData.js ---');
  const { menuData } = await import('../src/data/menuData.js');

  // Fetch current DB items to preserve any custom prices already updated by owner
  const { data: currentDbItems, error: fetchErr } = await supabase.from('items').select('*');
  if (fetchErr) {
    console.error('Error fetching current DB items:', fetchErr);
    return;
  }
  const dbItemMap = new Map((currentDbItems || []).map(i => [i.id, i]));

  const itemsToUpsert = [];

  for (const cat of menuData) {
    for (const item of (cat.items || [])) {
      const existing = dbItemMap.get(item.id);
      
      // Keep existing DB price if valid and set, otherwise fallback to menuData price
      let price = existing?.price;
      if (price == null || price <= 0 || isNaN(price)) {
        price = item.price || 0;
      }

      itemsToUpsert.push({
        id: item.id,
        category_id: cat.id,
        price: Number(price),
        image_url: item.image || existing?.image_url || null,
        tags: item.tags || existing?.tags || [],
        is_trending: Boolean(item.trending ?? existing?.is_trending ?? false),
        is_available: existing?.is_available !== undefined ? existing.is_available : true,
      });
    }
  }

  console.log(`\n--- STEP 3: Upserting ${itemsToUpsert.length} items into Supabase ---`);
  
  // Upsert in batches of 50
  for (let i = 0; i < itemsToUpsert.length; i += 50) {
    const batch = itemsToUpsert.slice(i, i + 50);
    const { error } = await supabase
      .from('items')
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`Error upserting batch ${i} - ${i + batch.length}:`, error);
    } else {
      console.log(`✓ Upserted items ${i + 1} to ${Math.min(i + 50, itemsToUpsert.length)}`);
    }
  }

  // Deactivate or flag removed items (like kuzu_gerdan_corba)
  const currentMenuIds = new Set(itemsToUpsert.map(i => i.id));
  const obsoleteItems = (currentDbItems || []).filter(i => !currentMenuIds.has(i.id));
  if (obsoleteItems.length > 0) {
    console.log(`\n--- STEP 4: Deactivating ${obsoleteItems.length} obsolete items not in menuData ---`);
    for (const obs of obsoleteItems) {
      console.log(`Deactivating: ${obs.id}`);
      await supabase.from('items').update({ is_available: false }).eq('id', obs.id);
    }
  }

  console.log('\n--- STEP 5: Verification ---');
  const { data: finalItems } = await supabase
    .from('items')
    .select('id, category_id, price, categories(name_tr)');

  const nullCatItems = finalItems.filter(i => !i.category_id || !i.categories);
  console.log(`Total items in DB: ${finalItems.length}`);
  console.log(`Items with missing/null category relationship: ${nullCatItems.length}`);
  if (nullCatItems.length > 0) {
    console.log('Unlinked items:', nullCatItems);
  } else {
    console.log('🎉 ALL items in database are now 100% properly categorized and linked!');
  }
}

syncAll();
