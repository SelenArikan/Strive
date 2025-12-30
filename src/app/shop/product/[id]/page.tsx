"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface MediaItem {
    type: "image" | "video";
    url: string;
}

interface Product {
    id: number;
    name: string;
    category: string;
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

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id;
    const { addToCart, totalItems } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState<string>("");
    const [selectedMediaType, setSelectedMediaType] = useState<"image" | "video">("image");
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                const found = data.products?.find((p: Product) => p.id === Number(productId));
                if (found) {
                    setProduct(found);
                    setSelectedMedia(found.image);
                    setSelectedMediaType("image");
                    // Set first size as default
                    if (found.sizes && found.sizes.length > 0) {
                        setSelectedSize(found.sizes[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (!product || !selectedSize) return;
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                originalPrice: product.originalPrice ?? undefined,
                image: product.image,
                size: selectedSize,
            });
        }
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleWhatsAppPurchase = async () => {
        if (!product) return;
        // Track analytics
        try {
            await fetch("/api/analytics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "purchase_click", productId: product.id }),
            });
        } catch (e) {
            console.error("Analytics error:", e);
        }

        const message = `Merhaba! Bu ürünü satın almak istiyorum:\n\n*${product.name}*\nAdet: ${quantity}\nFiyat: $${(product.price * quantity).toFixed(2)}\n\nÜrün linki: ${window.location.href}`;
        const whatsappUrl = `https://wa.me/905551234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    const getDiscountPercent = () => {
        if (product?.originalPrice && product.originalPrice > product.price) {
            return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        }
        return 0;
    };

    // Combine main image with media array
    const getAllMedia = (): MediaItem[] => {
        if (!product) return [];
        const mediaList: MediaItem[] = [];

        // Add main image first if not in media array
        if (product.image) {
            const mainInMedia = product.media?.some(m => m.url === product.image);
            if (!mainInMedia) {
                mediaList.push({ type: "image", url: product.image });
            }
        }

        // Add all media items
        if (product.media) {
            mediaList.push(...product.media);
        }

        return mediaList;
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

    if (!product) {
        return (
            <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-gray-600 text-6xl mb-4">error</span>
                <h1 className="text-2xl font-bold text-white mb-2">Ürün Bulunamadı</h1>
                <p className="text-gray-400 mb-6">Aradığınız ürün mevcut değil.</p>
                <Link href="/shop/catalog" className="px-6 py-3 bg-primary text-black font-bold rounded-xl">
                    Mağazaya Dön
                </Link>
            </div>
        );
    }

    const allMedia = getAllMedia();
    const discount = getDiscountPercent();

    return (
        <div className="min-h-screen bg-background-dark">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-surface-dark/95 backdrop-blur-md px-6 py-4 lg:px-12">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 text-white">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black">
                            <span className="material-symbols-outlined text-sm">sports_basketball</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Strive</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/shop/catalog" className="text-primary text-sm font-bold uppercase tracking-wide transition hover:text-white">Shop</Link>
                        <Link href="/about" className="text-gray-300 text-sm font-medium uppercase tracking-wide transition hover:text-white">Hakkımızda</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/cart" className="flex items-center justify-center rounded-full p-2 text-gray-300 hover:bg-white/10 hover:text-white transition relative">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                                {totalItems > 99 ? "99+" : totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-12">
                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap items-center gap-2 pb-6 text-sm">
                        <Link href="/" className="text-gray-400 hover:text-primary transition">Home</Link>
                        <span className="text-gray-600">/</span>
                        <Link href="/shop/catalog" className="text-gray-400 hover:text-primary transition">Shop</Link>
                        <span className="text-gray-600">/</span>
                        <span className="font-medium text-primary">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Left Column: Gallery */}
                        <div className="flex flex-col gap-4">
                            {/* Main Hero Image/Video */}
                            <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-surface-dark border border-white/10">
                                {selectedMediaType === "video" ? (
                                    <video
                                        src={selectedMedia}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        controls
                                        autoPlay
                                        muted
                                    />
                                ) : (
                                    <div className="absolute inset-0 transition duration-700 group-hover:scale-105">
                                        <Image src={selectedMedia} alt={product.name} fill className="object-cover" />
                                    </div>
                                )}

                                {/* Badges */}
                                <div className="absolute left-4 top-4 flex gap-2 z-10">
                                    {discount > 0 && (
                                        <span className="rounded bg-red-500 px-3 py-1 text-xs font-bold uppercase text-white">-{discount}%</span>
                                    )}
                                    <span className="rounded bg-primary px-3 py-1 text-xs font-bold uppercase text-black">{product.courtType}</span>
                                </div>
                            </div>

                            {/* Thumbnails Grid */}
                            {allMedia.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {allMedia.slice(0, 4).map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedMedia(item.url);
                                                setSelectedMediaType(item.type);
                                            }}
                                            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition hover:opacity-80 ${selectedMedia === item.url ? "border-primary" : "border-white/10"
                                                }`}
                                        >
                                            {item.type === "video" ? (
                                                <div className="absolute inset-0 bg-black flex items-center justify-center">
                                                    <video src={item.url} className="w-full h-full object-cover" muted />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                        <span className="material-symbols-outlined text-white text-2xl">play_circle</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Image src={item.url} alt="" fill className="object-cover" />
                                            )}
                                        </button>
                                    ))}
                                    {allMedia.length > 4 && (
                                        <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-surface-dark flex items-center justify-center">
                                            <span className="font-bold text-white text-sm">+{allMedia.length - 4}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column: Product Details */}
                        <div className="relative flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
                            {/* Header Info */}
                            <div className="space-y-2 border-b border-white/10 pb-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-primary">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className="material-symbols-outlined text-[20px]"
                                                style={i < Math.floor(product.rating) ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                            >
                                                {i < Math.floor(product.rating) ? "star" : i < product.rating ? "star_half" : "star_border"}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-400">{product.rating.toFixed(1)}</span>
                                </div>
                                <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-5xl">{product.name}</h1>
                                <p className="text-lg font-light text-gray-300">{product.description || product.category}</p>
                            </div>

                            {/* Price & Actions */}
                            <div className="space-y-6 py-2">
                                <div className="flex items-end gap-4">
                                    <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <>
                                            <p className="mb-1 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                                            <span className="mb-2 rounded bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-500">-{discount}%</span>
                                        </>
                                    )}
                                </div>

                                {/* Specs Grid Mini */}
                                <div className="grid grid-cols-2 gap-4 rounded-xl bg-surface-dark p-4 border border-white/10">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-500">Available Sizes</span>
                                        <span className="font-bold text-white">
                                            {product.sizes?.map(s => `Size ${s}`).join(", ") || "Size 7"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-500">Court Type</span>
                                        <span className="font-bold text-white">{product.courtType}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-500">Category</span>
                                        <span className="font-bold text-white">{product.category}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-500">Status</span>
                                        <span className={`font-bold ${product.inStock ? "text-green-400" : "text-red-400"}`}>
                                            {product.inStock ? "Stokta" : "Tükendi"}
                                        </span>
                                    </div>
                                </div>

                                {/* Size Selector */}
                                {product.sizes && product.sizes.length > 0 && (
                                    <div>
                                        <label className="mb-2 block text-xs font-medium uppercase text-gray-500">Beden Seçin</label>
                                        <div className="flex flex-wrap gap-2">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all ${selectedSize === size
                                                        ? "bg-primary border-primary text-black"
                                                        : "bg-surface-dark border-white/20 text-white hover:border-primary"
                                                        }`}
                                                >
                                                    Size {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div className="flex gap-4">
                                    <div className="w-32">
                                        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">Adet</label>
                                        <div className="flex items-center rounded-lg bg-surface-dark p-1 border border-white/10">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 text-white"
                                            >
                                                <span className="material-symbols-outlined text-sm">remove</span>
                                            </button>
                                            <input
                                                type="text"
                                                value={quantity}
                                                readOnly
                                                className="w-full bg-transparent text-center font-bold text-white outline-none focus:ring-0 border-none p-0"
                                            />
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 text-white"
                                            >
                                                <span className="material-symbols-outlined text-sm">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className={`w-full flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold transition ${addedToCart
                                        ? "bg-green-500 text-white"
                                        : product.inStock
                                            ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <span className="material-symbols-outlined">
                                        {addedToCart ? "check" : "add_shopping_cart"}
                                    </span>
                                    <span className="text-lg uppercase tracking-wide">
                                        {addedToCart ? "Sepete Eklendi!" : "Sepete Ekle"}
                                    </span>
                                </button>

                                {/* WhatsApp CTA */}
                                <button
                                    onClick={handleWhatsAppPurchase}
                                    disabled={!product.inStock}
                                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-4 text-black transition hover:bg-primary-light hover:shadow-[0_0_20px_rgba(232,106,51,0.4)] disabled:opacity-50"
                                >
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span className="text-lg font-bold uppercase tracking-wide">WhatsApp ile Satın Al</span>
                                </button>

                                <p className="text-center text-xs text-gray-500">Ücretsiz kargo - 14 gün iade garantisi</p>
                            </div>

                            {/* Accordion Items */}
                            <div className="divide-y divide-white/10 border-t border-white/10 pt-2">
                                {/* Product Details */}
                                <details className="group py-4" open>
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-white marker:content-none hover:text-primary">
                                        <span>Ürün Detayları</span>
                                        <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <div className="pt-3 text-sm leading-relaxed text-gray-400">
                                        {product.features && product.features.length > 0 ? (
                                            <ul className="list-disc space-y-2 pl-4 marker:text-primary">
                                                {product.features.map((feature, index) => (
                                                    <li key={index}>{feature}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>{product.description || "Ürün detayları mevcut değil."}</p>
                                        )}
                                    </div>
                                </details>

                                {/* Shipping & Returns */}
                                <details className="group py-4">
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-white marker:content-none hover:text-primary">
                                        <span>Kargo & İade</span>
                                        <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <div className="pt-3 text-sm leading-relaxed text-gray-400">
                                        Hızlı kargo ile gönderim yapılmaktadır. Ürün kullanılmamış ve orijinal ambalajında olması kaydıyla 14 gün içinde iade kabul edilmektedir.
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-24 border-t border-white/10 pt-12">
                        <h3 className="mb-8 text-2xl font-black uppercase text-white">Müşteri Yorumları</h3>
                        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                            {/* Summary */}
                            <div className="w-full lg:w-1/3">
                                <div className="rounded-2xl bg-surface-dark p-8 border border-white/10">
                                    <div className="flex items-end gap-3 mb-2">
                                        <span className="text-6xl font-black text-white">{product.rating.toFixed(1)}</span>
                                        <div className="mb-2 flex text-primary">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                    {i < Math.floor(product.rating) ? "star" : i < product.rating ? "star_half" : "star_border"}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 mb-6">215 değerlendirmeye göre</p>
                                    <div className="space-y-3">
                                        {[
                                            { stars: 5, percent: 78 },
                                            { stars: 4, percent: 15 },
                                            { stars: 3, percent: 4 },
                                            { stars: 2, percent: 1 },
                                            { stars: 1, percent: 2 },
                                        ].map((item) => (
                                            <div key={item.stars} className="grid grid-cols-[20px_1fr_40px] items-center gap-3 text-sm">
                                                <span className="text-white">{item.stars}</span>
                                                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                                                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.percent}%` }}></div>
                                                </div>
                                                <span className="text-right text-gray-400">{item.percent}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Review Cards */}
                            <div className="flex-1 space-y-6">
                                {/* Review 1 */}
                                <div className="border-b border-white/10 pb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-white">Muhteşem kalite!</h4>
                                        <span className="text-sm text-gray-500">2 gün önce</span>
                                    </div>
                                    <div className="flex text-primary mb-3 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-400 leading-relaxed">
                                        Grip mükemmel, saha tozlu olduğunda bile kayma yok. Street basket oynayan herkese tavsiye ederim.
                                    </p>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white">M</div>
                                        <span className="text-sm font-medium text-gray-300">Mehmet K.</span>
                                        <span className="ml-2 flex items-center gap-1 text-xs text-primary">
                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                            Doğrulanmış Alıcı
                                        </span>
                                    </div>
                                </div>

                                {/* Review 2 */}
                                <div className="border-b border-white/10 pb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-white">Fiyat/performans harika</h4>
                                        <span className="text-sm text-gray-500">1 hafta önce</span>
                                    </div>
                                    <div className="flex text-primary mb-3 text-sm">
                                        {[...Array(4)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        ))}
                                        <span className="material-symbols-outlined text-[16px]">star_border</span>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed">
                                        Bu fiyata gerçekten iyi kalite. Kanallar derin, şut çekerken kontrol sağlıyor.
                                    </p>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">A</div>
                                        <span className="text-sm font-medium text-gray-300">Ali V.</span>
                                        <span className="ml-2 flex items-center gap-1 text-xs text-primary">
                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                            Doğrulanmış Alıcı
                                        </span>
                                    </div>
                                </div>

                                {/* Review 3 */}
                                <div className="pb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-white">Beklediğimden iyi</h4>
                                        <span className="text-sm text-gray-500">2 hafta önce</span>
                                    </div>
                                    <div className="flex text-primary mb-3 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-400 leading-relaxed">
                                        Hızlı kargo, güzel paketleme. Top çok kaliteli, hem indoor hem outdoor kullanıyorum. Teşekkürler!
                                    </p>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-primary">E</div>
                                        <span className="text-sm font-medium text-gray-300">Emre T.</span>
                                        <span className="ml-2 flex items-center gap-1 text-xs text-primary">
                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                            Doğrulanmış Alıcı
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-20 border-t border-white/10 bg-surface-dark py-12 text-sm text-gray-400">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row lg:px-12">
                    <div className="flex flex-col gap-2 md:items-start">
                        <h2 className="text-xl font-bold text-white">Strive</h2>
                        <p>© 2024 Strive. Tüm hakları saklıdır.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        <Link href="#" className="hover:text-primary transition">Gizlilik Politikası</Link>
                        <Link href="#" className="hover:text-primary transition">Kullanım Şartları</Link>
                        <Link href="#" className="hover:text-primary transition">Kargo Bilgisi</Link>
                        <Link href="/about" className="hover:text-primary transition">İletişim</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
