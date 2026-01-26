import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Supported file types
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("files") as File[];

        // Support both single file and multiple files
        const singleFile = formData.get("file") as File | null;
        if (singleFile && files.length === 0) {
            files.push(singleFile);
        }

        if (files.length === 0) {
            return NextResponse.json({ success: false, error: "No files uploaded" }, { status: 400 });
        }

        const uploadedMedia: { type: "image" | "video"; url: string }[] = [];

        for (const file of files) {
            // Validate file type
            const isImage = IMAGE_TYPES.includes(file.type);
            const isVideo = VIDEO_TYPES.includes(file.type);

            if (!isImage && !isVideo) {
                continue; // Skip unsupported files
            }

            // Generate unique filename
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const timestamp = Date.now();
            const random = Math.random().toString(36).substring(2, 8);
            const extension = file.name.split(".").pop()?.toLowerCase() || (isImage ? "jpg" : "mp4");
            const filename = `product_${timestamp}_${random}.${extension}`;

            // Ensure upload directory exists
            const uploadDir = path.join(process.cwd(), "public", "uploads");
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch {
                // Directory might already exist
            }

            const filepath = path.join(uploadDir, filename);
            await writeFile(filepath, buffer);

            // Add to uploaded media list
            const mediaUrl = `/uploads/${filename}`;
            uploadedMedia.push({
                type: isImage ? "image" : "video",
                url: mediaUrl,
            });
        }

        if (uploadedMedia.length === 0) {
            return NextResponse.json(
                { success: false, error: "No valid files uploaded. Supported: JPEG, PNG, WebP, GIF, MP4, WebM, MOV" },
                { status: 400 }
            );
        }

        // Return response compatible with both single and multiple uploads
        return NextResponse.json({
            success: true,
            imageUrl: uploadedMedia[0]?.url, // Backwards compatibility
            media: uploadedMedia,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ success: false, error: "Failed to upload file" }, { status: 500 });
    }
}
