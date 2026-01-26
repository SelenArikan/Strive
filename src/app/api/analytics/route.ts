import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - Fetch analytics data
export async function GET() {
    try {
        // Get analytics record
        const { data: analytics, error: analyticsError } = await supabase
            .from("analytics")
            .select("*")
            .eq("id", 1)
            .single();

        if (analyticsError && analyticsError.code !== "PGRST116") {
            console.error("Error reading analytics:", analyticsError);
            return NextResponse.json({ success: false, error: "Failed to read analytics" }, { status: 500 });
        }

        // Get daily stats (last 30 days)
        const { data: dailyStats, error: statsError } = await supabase
            .from("daily_stats")
            .select("*")
            .order("date", { ascending: false })
            .limit(30);

        if (statsError) {
            console.error("Error reading daily stats:", statsError);
        }

        const productViews = analytics?.product_views || {};
        const topProducts = Object.entries(productViews)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 10);

        return NextResponse.json({
            success: true,
            purchaseClicks: analytics?.purchase_clicks || 0,
            productViews,
            topProducts,
            dailyStats: (dailyStats || []).reverse(),
        });
    } catch (error) {
        console.error("Error reading analytics:", error);
        return NextResponse.json({ success: false, error: "Failed to read analytics" }, { status: 500 });
    }
}

// POST - Track an event
export async function POST(request: Request) {
    try {
        const { type, productId, productName } = await request.json();
        const today = new Date().toISOString().split("T")[0];

        // Get current analytics
        const { data: analytics } = await supabase
            .from("analytics")
            .select("*")
            .eq("id", 1)
            .single();

        const currentClicks = analytics?.purchase_clicks || 0;
        const currentViews = analytics?.product_views || {};

        if (type === "purchase") {
            // Update purchase clicks
            await supabase
                .from("analytics")
                .upsert({
                    id: 1,
                    purchase_clicks: currentClicks + 1,
                    product_views: currentViews,
                    updated_at: new Date().toISOString(),
                });

            // Update daily stats
            const { data: todayStats } = await supabase
                .from("daily_stats")
                .select("*")
                .eq("date", today)
                .single();

            if (todayStats) {
                await supabase
                    .from("daily_stats")
                    .update({ purchases: todayStats.purchases + 1 })
                    .eq("date", today);
            } else {
                await supabase
                    .from("daily_stats")
                    .insert({ date: today, purchases: 1, views: 0 });
            }
        } else if (type === "view" && productId) {
            // Track product view
            const key = `${productId}_${productName || "Unknown"}`;
            const newViews = { ...currentViews, [key]: (currentViews[key] || 0) + 1 };

            await supabase
                .from("analytics")
                .upsert({
                    id: 1,
                    purchase_clicks: currentClicks,
                    product_views: newViews,
                    updated_at: new Date().toISOString(),
                });

            // Update daily stats
            const { data: todayStats } = await supabase
                .from("daily_stats")
                .select("*")
                .eq("date", today)
                .single();

            if (todayStats) {
                await supabase
                    .from("daily_stats")
                    .update({ views: todayStats.views + 1 })
                    .eq("date", today);
            } else {
                await supabase
                    .from("daily_stats")
                    .insert({ date: today, purchases: 0, views: 1 });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error tracking event:", error);
        return NextResponse.json({ success: false, error: "Failed to track event" }, { status: 500 });
    }
}
