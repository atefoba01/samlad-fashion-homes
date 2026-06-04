import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not configured. Database features will be limited.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getPalettes(category?: string) {
  let query = supabase.from('palettes').select('*');
  if (category && category !== 'all' && category !== 'trending') {
    query = query.eq('category', category);
  } else if (category === 'trending') {
    query = query.eq('is_trending', true);
  }
  const { data, error } = await query.order('likes_count', { ascending: false });
  return { data: data || [], error };
}

export async function getPaletteById(id: string) {
  const { data, error } = await supabase
    .from('palettes')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  return { data, error };
}

export async function getGalleryPosts(category?: string) {
  let query = supabase.from('gallery_posts').select('*');
  if (category) {
    query = query.eq('category', category);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function getReviews() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function submitContactForm(name: string, email: string, phone: string, message: string) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{ name, email, phone, message }]);
  return { data, error };
}

export async function getSavedPalettes(userId: string) {
  const { data, error } = await supabase
    .from('saved_palettes')
    .select('palette_id, palettes(*)')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false });
  return { data: data || [], error };
}

export async function savePalette(userId: string, paletteId: string) {
  const { data, error } = await supabase
    .from('saved_palettes')
    .insert([{ user_id: userId, palette_id: paletteId }]);
  return { data, error };
}

export async function removeSavedPalette(userId: string, paletteId: string) {
  const { data, error } = await supabase
    .from('saved_palettes')
    .delete()
    .eq('user_id', userId)
    .eq('palette_id', paletteId);
  return { data, error };
}

export async function incrementPaletteLikes(paletteId: string) {
  const { data, error } = await supabase.rpc('increment_likes', { palette_id: paletteId });
  return { data, error };
}


// Addtional info



// export function getImageUrl(path: string): string {
//   if (path?.startsWith('http')) return path;
//   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//   return `${supabaseUrl}/storage/v1/object/public/${path}`;
// }


export function getImageUrl(path: string): string {
  if (path?.startsWith('http')) return path;
  if (path?.startsWith('/')) return path;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  return `${supabaseUrl}/storage/v1/object/public/${path}`;
}