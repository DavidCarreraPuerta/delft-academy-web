import { createClient } from '@supabase/supabase-js';

// Usamos exactamente los mismos nombres que en el archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Este log aparecerá en tu consola (F12) para confirmar que la lectura es correcta
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Conexión Supabase: No se detectan las variables en el .env. Revisa el terminal.");
} else {
  console.log("✅ Conexión Supabase: Variables cargadas correctamente.");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);
