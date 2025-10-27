import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error('⚠️ Missing Supabase environment variables. Database features will be disabled.');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : '❌ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : '❌ Missing');
  console.error('\n📝 To fix this in Netlify:');
  console.error('1. Go to Site Settings > Environment Variables');
  console.error('2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  console.error('3. Redeploy your site');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
