import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/analytics.json");

// Helper to read data
function readData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
            return JSON.parse(fileContent);
        }
    } catch (error) {
        console.error("Error reading analytics file:", error);
    }
    return { purchaseClicks: 0, dailyStats: [] };
}

// Helper to write data
function writeData(data: any) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing analytics file:", error);
    }
}

// GET - Analytics verilerini getir
export async function GET() {
    const data = readData();
    return NextResponse.json({
        success: true,
        purchaseClicks: data.purchaseClicks || 0,
        dailyStats: data.dailyStats || []
    }, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });
}

// POST - Yeni olay (event) kaydet
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = readData();

        if (body.action === "purchase_click") {
            data.purchaseClicks = (data.purchaseClicks || 0) + 1;

            // Günlük istatistik güncelleme
            const today = new Date().toISOString().split('T')[0];
            const todayStatIndex = data.dailyStats.findIndex((s: any) => s.date === today);

            if (todayStatIndex >= 0) {
                data.dailyStats[todayStatIndex].clicks += 1;
            } else {
                data.dailyStats.push({ date: today, clicks: 1 });
            }

            // Son 30 günü tut
            if (data.dailyStats.length > 30) {
                data.dailyStats = data.dailyStats.slice(-30);
            }

            writeData(data);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving analytics:", error);
        return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
    }
}
