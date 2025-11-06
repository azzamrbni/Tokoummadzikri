import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); // Memuat variabel dari .env

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL atau Service Key tidak ditemukan di .env");
}

// Buat satu klien untuk digunakan di seluruh server
export const supabase = createClient(supabaseUrl, supabaseKey);