import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const JSON_FILE_PATH = path.join(process.cwd(), "src/data/products.json");

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

interface Product {
    id: number;
    name: string;
    rating: number;
    reviews?: Review[];
    // Diğer alanlar opsiyonel, sadece id ve rating'i güncellemek için gerekli olanları tanımlasak yeterli ama
    // typescript hatası almamak için tam yapıyı bilmek veya 'any' kullanmak gerekebilir.
    // Şimdilik okuma/yazma tam veriyle yapıldığı için sorun yok.
    [key: string]: any;
}

interface ProductsData {
    products: Product[];
    sizes: string[];
    courtTypes: string[];
}

function readProducts(): ProductsData {
    try {
        const fileContent = fs.readFileSync(JSON_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading products file:", error);
        return { products: [], sizes: [], courtTypes: [] };
    }
}

function writeProducts(data: ProductsData): boolean {
    try {
        fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing products file:", error);
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { productId, userName, rating, comment } = body;

        if (!productId || !userName || !rating) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const data = readProducts();
        const productIndex = data.products.findIndex(p => p.id === Number(productId));

        if (productIndex === -1) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        const product = data.products[productIndex];

        // Yeni yorum oluştur
        const newReview: Review = {
            id: Date.now().toString(),
            userName,
            rating: Number(rating),
            comment,
            date: new Date().toISOString()
        };

        // Yorumları güncelle
        const currentReviews = product.reviews || [];
        const updatedReviews = [newReview, ...currentReviews];

        // Yeni ortalama puanı hesapla
        const totalRating = updatedReviews.reduce((sum, rev) => sum + rev.rating, 0);
        const newAverageRating = Number((totalRating / updatedReviews.length).toFixed(1));

        // Ürünü güncelle
        data.products[productIndex] = {
            ...product,
            reviews: updatedReviews,
            rating: newAverageRating
        };

        if (writeProducts(data)) {
            return NextResponse.json({
                success: true,
                product: data.products[productIndex],
                message: "Yorum başarıyla eklendi"
            });
        } else {
            return NextResponse.json({ success: false, error: "Failed to save review" }, { status: 500 });
        }

    } catch (error) {
        console.error("Error adding review:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
