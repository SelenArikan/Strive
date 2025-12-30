import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "products.json");

// Ensure data directory exists
async function ensureDataFile() {
    try {
        await fs.access(dataFilePath);
    } catch {
        const dir = path.dirname(dataFilePath);
        await fs.mkdir(dir, { recursive: true });
        // Initialize with empty products array if not exists
        await fs.writeFile(dataFilePath, JSON.stringify({ products: [], sizes: [], courtTypes: [] }, null, 2), "utf8");
    }
}

// GET - Fetch all products
export async function GET() {
    await ensureDataFile();
    try {
        const fileContents = await fs.readFile(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error reading products:", error);
        return NextResponse.json({ products: [], sizes: [], courtTypes: [] });
    }
}

// POST - Add new product
export async function POST(request: Request) {
    await ensureDataFile();
    try {
        const newProduct = await request.json();
        const fileContents = await fs.readFile(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);

        // Initialize products array if it doesn't exist
        if (!data.products) data.products = [];

        // Add new product
        data.products.push(newProduct);

        // Save to file
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");

        return NextResponse.json({ success: true, product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
    }
}

// PUT - Update existing product
export async function PUT(request: Request) {
    await ensureDataFile();
    try {
        const updatedProduct = await request.json();
        const fileContents = await fs.readFile(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);

        if (!data.products) return NextResponse.json({ success: false, error: "No products found" }, { status: 404 });

        // Find and update product
        const index = data.products.findIndex((p: { id: number }) => p.id === updatedProduct.id);
        if (index === -1) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }

        data.products[index] = updatedProduct;

        // Save to file
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");

        return NextResponse.json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
    }
}

// DELETE - Remove product
export async function DELETE(request: Request) {
    await ensureDataFile();
    try {
        const { id } = await request.json();
        const fileContents = await fs.readFile(dataFilePath, "utf8");
        const data = JSON.parse(fileContents);

        if (!data.products) return NextResponse.json({ success: false, error: "No products found" }, { status: 404 });

        // Filter out the product
        data.products = data.products.filter((p: { id: number }) => p.id !== id);

        // Save to file
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf8");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
    }
}
