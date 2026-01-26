import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Product {
    id: number;
    name: string;
    main_category: string;
    category: string | null;
    sizes: number[];
    court_type: string;
    price: number;
    original_price: number | null;
    rating: number;
    description: string | null;
    features: string[] | null;
    image: string;
    media: { type: "image" | "video"; url: string }[];
    in_stock: boolean;
    created_at: string;
}

export interface Analytics {
    id: number;
    purchase_clicks: number;
    product_views: { [key: string]: number };
    updated_at: string;
}

export interface DailyStats {
    id: number;
    date: string;
    purchases: number;
    views: number;
}
