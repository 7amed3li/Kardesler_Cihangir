import WebSocket from 'ws';
globalThis.WebSocket = WebSocket;

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newItems = [
  { id: "hunkarbegendi", category_id: "kebap", price: 1500, image_url: "/images/hunkarbegendi.webp", tags: ["signature"], is_trending: true, is_available: true },
  { id: "adana_kuzu_sis_kebap", category_id: "kebap", price: 1500, image_url: "/images/adana_kuzu_sis_kebap.webp", tags: ["signature"], is_trending: true, is_available: true },
  { id: "adana_tavuk_sis_kebap", category_id: "kebap", price: 1500, image_url: "/images/adana_tavuk_sis_kebap.webp", tags: ["signature"], is_trending: false, is_available: true },
  { id: "kuzu_tavuk_sis_kebap", category_id: "kebap", price: 1500, image_url: "/images/kuzu_tavuk_sis_kebap.webp", tags: [], is_trending: false, is_available: true },
  { id: "pastirma_kavurmali_kasarli_pide", category_id: "pide", price: 700, image_url: null, tags: [], is_trending: true, is_available: true },
  { id: "ispanakli_pide", category_id: "pide", price: 410, image_url: "/images/ispanakli_pide.webp", tags: ["vegetarian"], is_trending: false, is_available: true },
  { id: "patatesli_pide", category_id: "pide", price: 410, image_url: null, tags: ["vegetarian"], is_trending: false, is_available: true },
  { id: "peymacun", category_id: "lahmacun", price: 340, image_url: "/images/peymacun.webp", tags: ["vegetarian"], is_trending: true, is_available: true },
  { id: "kopogl", category_id: "meze", price: 180, image_url: null, tags: ["vegetarian"], is_trending: false, is_available: true },
  { id: "saksuka", category_id: "meze", price: 180, image_url: null, tags: ["vegetarian", "vegan"], is_trending: false, is_available: true },
  { id: "yogurtlu_karamelize_sogan", category_id: "meze", price: 180, image_url: null, tags: ["vegetarian"], is_trending: false, is_available: true },
  { id: "vejetaryen_vegan_tabagi", category_id: "meze", price: 600, image_url: null, tags: ["vegetarian", "vegan"], is_trending: true, is_available: true }
];

async function sync() {
  console.log("Upserting new items into Supabase 'items' table...");
  const { data, error } = await supabase
    .from('items')
    .upsert(newItems, { onConflict: 'id' })
    .select('id, category_id, price');

  if (error) {
    console.error("Error upserting items:", error);
    process.exit(1);
  } else {
    console.log(`Successfully synced ${data.length} items to database & admin panel:`);
    console.table(data);
  }
}

sync();
