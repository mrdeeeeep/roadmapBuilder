import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = 'https://srosxalhoczbnzonjzkb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyb3N4YWxob2N6Ym56b25qemtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MzA4NTgsImV4cCI6MjA1OTEwNjg1OH0.xx6FNJzj9uNGHCAjy_EjaPyJYoHaxpS031e3cNEGIpY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey); 