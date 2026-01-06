"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface MediaItem {
    type: "image" | "video";
    url: string;
}

interface Product {
    id: number;
    name: string;
    mainCategory: string; // Ana kategori: Basketbol Topu, Mat, vs.
    category: string; // Alt kategori: Indoor Series, Outdoor Series, vs.
    sizes: number[];
    courtType: string;
    price: number;
    originalPrice?: number | null;
    rating: number;
    description?: string;
    features?: string[];
    image: string;
    media?: MediaItem[];
    inStock: boolean;
    createdAt: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        mainCategory: "Basketbol Topu",
        category: "",
        sizes: [7] as number[],
        courtType: "Indoor (Pro)",
        price: 0,
        originalPrice: 0,
        rating: 4.5,
        description: "",
        features: "",
        image: "",
        media: [] as MediaItem[],
        inStock: true,
    });

    // Check authentication
    useEffect(() => {
        const isAuth = localStorage.getItem("adminAuth");
        if (!isAuth) {
            router.push("/admin");
        }
    }, [router]);

    const [analytics, setAnalytics] = useState({ purchaseClicks: 0, dailyStats: [] });

    // Fetch products & analytics
    useEffect(() => {
        fetchProducts();
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch("/api/analytics");
            const data = await res.json();
            if (data.success) {
                setAnalytics({ purchaseClicks: data.purchaseClicks, dailyStats: data.dailyStats });
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        router.push("/admin");
    };

    const resetForm = () => {
        setFormData({
            name: "",
            mainCategory: "Basketbol Topu",
            category: "",
            sizes: [7],
            courtType: "Indoor (Pro)",
            price: 0,
            originalPrice: 0,
            rating: 4.5,
            description: "",
            features: "",
            image: "",
            media: [],
            inStock: true,
        });
        setEditingProduct(null);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            mainCategory: product.mainCategory || "Basketbol Topu",
            category: product.category,
            sizes: product.sizes || [7],
            courtType: product.courtType,
            price: product.price,
            originalPrice: product.originalPrice || 0,
            rating: product.rating,
            description: product.description || "",
            features: product.features?.join(", ") || "",
            image: product.image,
            media: product.media || [],
            inStock: product.inStock,
        });
        setShowForm(true);
    };

    const toggleSize = (size: number) => {
        setFormData(prev => {
            if (prev.sizes.includes(size)) {
                // Don't remove if it's the last one
                if (prev.sizes.length === 1) return prev;
                return { ...prev, sizes: prev.sizes.filter(s => s !== size) };
            }
            return { ...prev, sizes: [...prev.sizes, size].sort((a, b) => a - b) };
        });
    };

    const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const uploadFormData = new FormData();

        // Add all files
        for (let i = 0; i < files.length; i++) {
            uploadFormData.append("files", files[i]);
        }

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadFormData,
            });

            const data = await res.json();
            if (data.success && data.media) {
                const newMedia = [...formData.media, ...data.media];
                // Set first image as main image if not set
                const firstImage = newMedia.find(m => m.type === "image");
                setFormData({
                    ...formData,
                    media: newMedia,
                    image: formData.image || firstImage?.url || ""
                });
                setMessage({ type: "success", text: `${data.media.length} dosya yüklendi!` });
            } else {
                setMessage({ type: "error", text: data.error || "Dosya yüklenemedi" });
            }
        } catch (error) {
            console.error("Error uploading media:", error);
            setMessage({ type: "error", text: "Dosya yüklenirken hata oluştu" });
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = "";
        }
    };

    const removeMedia = (index: number) => {
        const newMedia = formData.media.filter((_, i) => i !== index);
        const removedItem = formData.media[index];

        // If removing the main image, set a new one
        let newImage = formData.image;
        if (removedItem.url === formData.image) {
            const firstImage = newMedia.find(m => m.type === "image");
            newImage = firstImage?.url || "";
        }

        setFormData({ ...formData, media: newMedia, image: newImage });
    };

    const setAsMainImage = (url: string) => {
        setFormData({ ...formData, image: url });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: "", text: "" });

        const productData: Product = {
            id: editingProduct?.id || Date.now(),
            name: formData.name,
            mainCategory: formData.mainCategory,
            category: formData.category,
            sizes: formData.sizes,
            courtType: formData.courtType,
            price: formData.price,
            originalPrice: formData.originalPrice > 0 ? formData.originalPrice : null,
            rating: formData.rating,
            description: formData.description || undefined,
            features: formData.features ? formData.features.split(",").map((f) => f.trim()) : undefined,
            image: formData.image,
            media: formData.media.length > 0 ? formData.media : undefined,
            inStock: formData.inStock,
            createdAt: editingProduct?.createdAt || new Date().toISOString(),
        };

        try {
            const res = await fetch("/api/products", {
                method: editingProduct ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            });

            if (res.ok) {
                setMessage({ type: "success", text: editingProduct ? "Ürün güncellendi!" : "Ürün eklendi!" });
                fetchProducts();
                resetForm();
                setShowForm(false);
            } else {
                setMessage({ type: "error", text: "Ürün kaydedilemedi" });
            }
        } catch (error) {
            console.error("Error saving product:", error);
            setMessage({ type: "error", text: "Ürün kaydedilirken hata oluştu" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return;

        try {
            const res = await fetch("/api/products", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (res.ok) {
                setMessage({ type: "success", text: "Ürün silindi!" });
                fetchProducts();
            } else {
                setMessage({ type: "error", text: "Ürün silinemedi" });
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            setMessage({ type: "error", text: "Ürün silinirken hata oluştu" });
        }
    };

    // Calculate discount percentage
    const getDiscountPercent = (product: Product) => {
        if (product.originalPrice && product.originalPrice > product.price) {
            return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        }
        return 0;
    };

    // Check if product is new (within 5 days)
    const isNewProduct = (createdAt: string) => {
        const created = new Date(createdAt);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 5;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-primary text-5xl animate-spin">progress_activity</span>
                    <p className="text-gray-400 mt-4">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark">
            {/* Header */}
            <header className="bg-surface-dark border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 bg-primary rounded-full flex items-center justify-center text-black">
                            <span className="material-symbols-outlined">admin_panel_settings</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-xs text-gray-500">Strive Yönetim Paneli</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            Siteyi Görüntüle
                        </Link>
                        <Link href="/shop/catalog" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-lg">storefront</span>
                            Mağaza
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            Çıkış
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Message */}
                {message.text && (
                    <div
                        className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/30" : "bg-red-500/10 text-red-400 border border-red-500/30"
                            }`}
                    >
                        <span className="material-symbols-outlined">{message.type === "success" ? "check_circle" : "error"}</span>
                        {message.text}
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-surface-dark rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Toplam Ürün</p>
                                <p className="text-3xl font-bold text-white mt-1">{products.length}</p>
                            </div>
                            <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-2xl">inventory_2</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface-dark rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Yeni Ürünler</p>
                                <p className="text-3xl font-bold text-green-400 mt-1">{products.filter((p) => isNewProduct(p.createdAt)).length}</p>
                            </div>
                            <div className="size-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-400 text-2xl">new_releases</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface-dark rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">İndirimli</p>
                                <p className="text-3xl font-bold text-red-400 mt-1">{products.filter((p) => p.originalPrice && p.originalPrice > p.price).length}</p>
                            </div>
                            <div className="size-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-400 text-2xl">local_offer</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface-dark rounded-xl p-6 border border-white/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">WhatsApp Sipariş Talebi</p>
                                <p className="text-3xl font-bold text-green-400 mt-1">
                                    {analytics.purchaseClicks}
                                </p>
                            </div>
                            <div className="size-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-400 text-2xl">shopping_cart_checkout</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Ürünler</h2>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="bg-primary hover:bg-primary-light text-black font-bold px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Yeni Ürün Ekle
                    </button>
                </div>

                {/* Product Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <div className="bg-surface-dark rounded-2xl border border-white/10 w-full max-w-2xl my-8">
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h3 className="text-xl font-bold text-white">{editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h3>
                                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Ürün Adı *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            placeholder="Örn: Pro Court Official"
                                            required
                                        />
                                    </div>

                                    {/* Media Upload */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Ürün Görselleri & Videoları
                                            <span className="text-gray-500 text-xs ml-2">(Birden fazla seçebilirsiniz)</span>
                                        </label>

                                        {/* File Upload Area */}
                                        <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                                            <input
                                                type="file"
                                                accept="image/*,video/mp4,video/webm,video/quicktime"
                                                onChange={handleMediaUpload}
                                                className="hidden"
                                                id="mediaUpload"
                                                disabled={isUploading}
                                                multiple
                                            />
                                            <label htmlFor="mediaUpload" className="cursor-pointer">
                                                {isUploading ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
                                                        <p className="text-gray-400">Yükleniyor...</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <span className="material-symbols-outlined text-gray-400 text-4xl">cloud_upload</span>
                                                        <p className="text-gray-400">Görsel veya video yüklemek için tıklayın</p>
                                                        <p className="text-gray-500 text-xs">JPEG, PNG, WebP, GIF, MP4, WebM, MOV</p>
                                                    </div>
                                                )}
                                            </label>
                                        </div>

                                        {/* Media Gallery */}
                                        {formData.media.length > 0 && (
                                            <div className="mt-4 grid grid-cols-4 gap-3">
                                                {formData.media.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`relative group rounded-lg overflow-hidden border-2 ${item.url === formData.image ? "border-primary" : "border-white/10"
                                                            }`}
                                                    >
                                                        {item.type === "video" ? (
                                                            <div className="w-full aspect-square bg-black flex items-center justify-center">
                                                                <video
                                                                    src={item.url}
                                                                    className="w-full h-full object-cover"
                                                                    muted
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                                    <span className="material-symbols-outlined text-white text-3xl">play_circle</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="relative w-full aspect-square">
                                                                <Image src={item.url} alt="" fill className="object-cover" />
                                                            </div>
                                                        )}

                                                        {/* Overlay with actions */}
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                            {item.type === "image" && item.url !== formData.image && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setAsMainImage(item.url)}
                                                                    className="p-1.5 bg-primary rounded-full text-black"
                                                                    title="Ana görsel yap"
                                                                >
                                                                    <span className="material-symbols-outlined text-sm">star</span>
                                                                </button>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeMedia(index)}
                                                                className="p-1.5 bg-red-500 rounded-full text-white"
                                                                title="Sil"
                                                            >
                                                                <span className="material-symbols-outlined text-sm">delete</span>
                                                            </button>
                                                        </div>

                                                        {/* Main image indicator */}
                                                        {item.url === formData.image && (
                                                            <div className="absolute top-1 left-1 bg-primary text-black text-[10px] px-1.5 py-0.5 rounded font-bold">
                                                                ANA
                                                            </div>
                                                        )}

                                                        {/* Video indicator */}
                                                        {item.type === "video" && (
                                                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                                                                VIDEO
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {formData.media.length === 0 && (
                                            <p className="text-gray-500 text-xs mt-2">Henüz medya eklenmedi</p>
                                        )}
                                    </div>

                                    {/* Main Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Ana Kategori *</label>
                                        <select
                                            value={formData.mainCategory}
                                            onChange={(e) => setFormData({ ...formData, mainCategory: e.target.value })}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            required
                                        >
                                            <option value="Basketbol Topu">Basketbol Topu</option>
                                            <option value="Mat">Mat</option>
                                            <option value="Aksesuar">Aksesuar</option>
                                            <option value="Giyim">Giyim</option>
                                            <option value="Antrenman Ekipmanları">Antrenman Ekipmanları</option>
                                        </select>
                                    </div>

                                    {/* Sub Category */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Alt Kategori</label>
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            placeholder="Örn: Indoor Series, Outdoor Series"
                                        />
                                    </div>

                                    {/* Sizes */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Bedenler *</label>
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                { value: 3, label: "Size 3 (Mini)" },
                                                { value: 5, label: "Size 5 (Youth)" },
                                                { value: 6, label: "Size 6 (Women's)" },
                                                { value: 7, label: "Size 7 (Men's)" },
                                            ].map((size) => (
                                                <button
                                                    key={size.value}
                                                    type="button"
                                                    onClick={() => toggleSize(size.value)}
                                                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${formData.sizes.includes(size.value)
                                                        ? "bg-primary border-primary text-black"
                                                        : "bg-background-dark border-white/10 text-white hover:border-primary/50"
                                                        }`}
                                                >
                                                    {size.label}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">Birden fazla beden seçebilirsiniz</p>
                                    </div>

                                    {/* Court Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Court Type *</label>
                                        <select
                                            value={formData.courtType}
                                            onChange={(e) => setFormData({ ...formData, courtType: e.target.value })}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                        >
                                            <option value="Indoor (Pro)">Indoor (Pro)</option>
                                            <option value="Outdoor (Street)">Outdoor (Street)</option>
                                            <option value="Hybrid / All-Surface">Hybrid / All-Surface</option>
                                            <option value="3x3 Official">3x3 Official</option>
                                        </select>
                                    </div>

                                    {/* Rating */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Rating (1-5)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="1"
                                            max="5"
                                            value={formData.rating}
                                            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Fiyat ($) *</label>
                                        <input
                                            type="text"
                                            value={formData.price}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (/^\d*\.?\d*$/.test(val)) {
                                                    setFormData({ ...formData, price: val as any });
                                                }
                                            }}
                                            onBlur={(e) => {
                                                setFormData({ ...formData, price: Number(e.target.value) });
                                            }}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>

                                    {/* Original Price (for discount) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Orijinal Fiyat ($) <span className="text-red-400">(İndirim için)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.originalPrice}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (/^\d*\.?\d*$/.test(val)) {
                                                    setFormData({ ...formData, originalPrice: val as any });
                                                }
                                            }}
                                            onBlur={(e) => {
                                                setFormData({ ...formData, originalPrice: Number(e.target.value) });
                                            }}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            placeholder="0 = İndirim yok"
                                        />
                                        {Number(formData.originalPrice) > 0 && Number(formData.price) > 0 && Number(formData.originalPrice) > Number(formData.price) && (
                                            <p className="text-red-400 text-sm mt-1">
                                                %{Math.round(((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100)} indirim uygulanacak
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Açıklama</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary h-24 resize-none"
                                            placeholder="Ürün açıklaması..."
                                        />
                                    </div>

                                    {/* Features */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Özellikler (virgülle ayırın)</label>
                                        <input
                                            type="text"
                                            value={formData.features}
                                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                            className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            placeholder="Örn: Pro-Grade Leather, Deep Channel Design"
                                        />
                                    </div>

                                    {/* In Stock */}
                                    <div className="col-span-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.inStock}
                                                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                                                className="w-5 h-5 rounded border-white/10 bg-background-dark text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-gray-300">Stokta Var</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-lg transition-colors"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 bg-primary hover:bg-primary-light text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                                Kaydediliyor...
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-lg">save</span>
                                                {editingProduct ? "Güncelle" : "Ürün Ekle"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Products Table */}
                <div className="bg-surface-dark rounded-xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-background-dark">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Ürün</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Kategori</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Size</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Fiyat</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Medya</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Durum</th>
                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative size-12 rounded-lg overflow-hidden bg-background-dark">
                                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-white">{product.name}</p>
                                                        {isNewProduct(product.createdAt) && (
                                                            <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500 text-white rounded">NEW</span>
                                                        )}
                                                        {getDiscountPercent(product) > 0 && (
                                                            <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded">
                                                                -{getDiscountPercent(product)}%
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500">ID: {product.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{product.category}</td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {product.sizes?.map(s => `Size ${s}`).join(", ") || "Size 7"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.originalPrice && product.originalPrice > product.price ? (
                                                <div>
                                                    <span className="text-gray-500 text-xs line-through">₺{product.originalPrice.toFixed(2)}</span>
                                                    <span className="text-red-400 font-medium ml-2">₺{product.price.toFixed(2)}</span>
                                                </div>
                                            ) : (
                                                <span className="text-primary font-medium">₺{product.price.toFixed(2)}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-400 text-sm">
                                                    {product.media?.filter(m => m.type === "image").length || 1} 📷
                                                </span>
                                                {product.media?.some(m => m.type === "video") && (
                                                    <span className="text-gray-400 text-sm ml-1">
                                                        {product.media.filter(m => m.type === "video").length} 🎬
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                                    }`}
                                            >
                                                {product.inStock ? "Stokta" : "Tükendi"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                                    title="Düzenle"
                                                >
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                                                    title="Sil"
                                                >
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {products.length === 0 && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-gray-600 text-5xl">inventory_2</span>
                            <p className="text-gray-500 mt-2">Henüz ürün yok. İlk ürününüzü ekleyin!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
