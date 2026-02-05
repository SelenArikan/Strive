import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const JSON_FILE_PATH = path.join(process.cwd(), "src/data/products.json");

interface MediaItem {
    type: "image" | "video";
    url: string;
}

interface Product {
    id: number;
    name: string;
    mainCategory: string;
    category: string;
    size: string;
    courtType: string;
    price: number;
    originalPrice?: number | null;
    rating: number;
    description?: string;
    features?: string[];
    image: string;
    media?: MediaItem[];
    inStock: boolean;
    shippingIncluded?: boolean;
    shippingCost?: number;
    createdAt: string;
}

interface ProductsData {
    products: Product[];
    sizes: string[];
    courtTypes: string[];
}

// Read products from JSON file
function readProducts(): ProductsData {
    try {
        const fileContent = fs.readFileSync(JSON_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading products file:", error);
        return { products: [], sizes: [], courtTypes: [] };
    }
}

// Write products to JSON file
function writeProducts(data: ProductsData): boolean {
    try {
        fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing products file:", error);
        return false;
    }
}

// GET - Fetch all products
export async function GET() {
    try {
        const data = readProducts();
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ products: [], sizes: [], courtTypes: [] });
    }
}

// POST - Add new product
export async function POST(request: Request) {
    try {
        const newProduct = await request.json();
        const data = readProducts();

        // Ensure id and createdAt are set
        const product: Product = {
            ...newProduct,
            id: newProduct.id || Date.now(),
            createdAt: newProduct.createdAt || new Date().toISOString(),
        };

        data.products.unshift(product); // Add to beginning

        if (writeProducts(data)) {
            return NextResponse.json({ success: true, product });
        } else {
            return NextResponse.json({ success: false, error: "Failed to save product" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
    }
}

// PUT - Update existing product
export async function PUT(request: Request) {
    try {
        const updatedProduct = await request.json();
        const data = readProducts();

        const index = data.products.findIndex(p => p.id === updatedProduct.id);
        if (index === -1) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        // Preserve createdAt from original product
        const product: Product = {
            ...updatedProduct,
            createdAt: data.products[index].createdAt,
        };

        data.products[index] = product;

        if (writeProducts(data)) {
            return NextResponse.json({ success: true, product });
        } else {
            return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
    }
}

// DELETE - Remove product
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const data = readProducts();

        const index = data.products.findIndex(p => p.id === id);
        if (index === -1) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        data.products.splice(index, 1);

        if (writeProducts(data)) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
    }
}
