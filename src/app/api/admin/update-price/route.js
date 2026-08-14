import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const updatePriceSchema = z.object({
  // No special characters allowed to prevent XSS/SQLi explicitly
  itemId: z.string().min(1).max(100).regex(/^[^<>'"]+$/, "Invalid characters detected"),
  newPrice: z.number().positive().max(1000000)
});

// Basic in-memory rate limiter
// Use globalThis to persist the Map across Next.js dev reloads
const rateLimitMap = globalThis.apiRateLimitMap || new Map();
if (process.env.NODE_ENV !== 'production') globalThis.apiRateLimitMap = rateLimitMap;

function isRateLimited(userId) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 50; // max requests per minute

  if (!rateLimitMap.has(userId)) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + windowMs });
    return false;
  }

  const userRecord = rateLimitMap.get(userId);
  if (now > userRecord.resetAt) {
    userRecord.count = 1;
    userRecord.resetAt = now + windowMs;
    return false;
  }

  userRecord.count++;
  if (userRecord.count > limit) {
    return true;
  }

  return false;
}

export async function POST(request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate and get user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const role = user.user_metadata?.role || 'user';
    if (role !== 'owner' && role !== 'developer') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Apply Rate Limiting
    if (isRateLimited(user.id)) {
      return NextResponse.json({ error: 'Too Many Requests. Please wait a minute.' }, { status: 429 });
    }

    // 2. Parse and strictly validate payload with Zod
    const body = await request.json();
    
    // Convert newPrice to number if it's string (since UI might send string)
    if (typeof body.newPrice === 'string') {
      body.newPrice = parseFloat(body.newPrice);
    }

    const validationResult = updatePriceSchema.safeParse(body);
    if (!validationResult.success) {
      console.warn("Zod validation failed:", validationResult.error);
      return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }

    const { itemId, newPrice } = validationResult.data;

    // 3. Fetch current item to get old price
    const { data: currentItem, error: fetchError } = await supabase
      .from('items')
      .select('price')
      .eq('id', itemId)
      .single();

    if (fetchError || !currentItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const oldPrice = currentItem.price;

    // 4. Update the price
    const { error: updateError } = await supabase
      .from('items')
      .update({ price: newPrice })
      .eq('id', itemId);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ error: 'Failed to update price' }, { status: 500 });
    }

    // 5. Log the history using admin client or if RLS allows owner to insert
    // RLS policy allows owner to insert to price_history, so we can use current client
    const { error: historyError } = await supabase
      .from('price_history')
      .insert({
        item_id: itemId,
        old_price: oldPrice,
        new_price: newPrice,
        modified_by: user.id
      });

    if (historyError) {
      console.error('History error:', historyError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Price updated successfully',
      data: { itemId, newPrice } 
    });

  } catch (error) {
    console.error('Update price error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
