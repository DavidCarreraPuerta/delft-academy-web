import { createClient } from '@supabase/supabase-js'

// Intentamos obtener las variables, si no existen usamos un texto temporal
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'placeholder-key'

// Exportamos el cliente blindado
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
