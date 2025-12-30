import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const analyticsFilePath = path.join(process.cwd(), "src", "data", "analytics.json");

interface Analytics {
    purchaseClicks: number;
    productViews: { [productId: string]: number };
    dailyStats: { date: string; purchases: number; views: number }[];
}

async function getAnalytics(): Promise<Analytics> {
    try {
        const fileContents = await fs.readFile(analyticsFilePath, "utf8");
        return JSON.parse(fileContents);
    } catch {
        return { purchaseClicks: 0, productViews: {}, dailyStats: [] };
    }
}

async function saveAnalytics(data: Analytics) {
    await fs.writeFile(analyticsFilePath, JSON.stringify(data, null, 2), "utf8");
}

// GET - Fetch analytics data
export async function GET() {
    try {
        const analytics = await getAnalytics();

        // Calculate top viewed products
        const topProducts = Object.entries(analytics.productViews)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10);

        return NextResponse.json({
            success: true,
            purchaseClicks: analytics.purchaseClicks,
            productViews: analytics.productViews,
            topProducts,
            dailyStats: analytics.dailyStats.slice(-30), // Last 30 days
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
        const analytics = await getAnalytics();
        const today = new Date().toISOString().split("T")[0];

        // Find or create today's stats
        let todayStats = analytics.dailyStats.find((s) => s.date === today);
        if (!todayStats) {
            todayStats = { date: today, purchases: 0, views: 0 };
            analytics.dailyStats.push(todayStats);
        }

        if (type === "purchase") {
            // Track purchase click
            analytics.purchaseClicks++;
            todayStats.purchases++;
        } else if (type === "view" && productId) {
            // Track product view
            const key = `${productId}_${productName || "Unknown"}`;
            analytics.productViews[key] = (analytics.productViews[key] || 0) + 1;
            todayStats.views++;
        }

        await saveAnalytics(analytics);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error tracking event:", error);
        return NextResponse.json({ success: false, error: "Failed to track event" }, { status: 500 });
    }
}
