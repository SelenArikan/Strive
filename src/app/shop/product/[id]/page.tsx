"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Footer from "@/components/Footer";

import { useLanguage } from "@/hooks/useLanguage";

interface MediaItem {
    type: "image" | "video";
    url: string;
}

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

interface SizeVariant {
    size: string;
    price: number;
    originalPrice?: number | null;
    features?: string[];
}

interface Product {
    id: number;
    name: string;
    category: string;
    sizes?: string[];
    size?: string;
    courtType: string;
    price: number;
    originalPrice?: number | null;
    sizeVariants?: SizeVariant[];
    shippingIncluded?: boolean;
    shippingCost?: number;
    rating: number;
    description?: string;
    features?: string[];
    reviews?: Review[];
    image: string;
    media?: MediaItem[];
    inStock: boolean;
    createdAt: string;
}

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id;
    const { addToCart, totalItems } = useCart();
    const { t, locale, setLocale } = useLanguage();

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState<string>("");
    const [selectedMediaType, setSelectedMediaType] = useState<"image" | "video">("image");
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Review State
    const [reviewForm, setReviewForm] = useState({ userName: "", rating: 5, comment: "" });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    // Calculate rating stats
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, total: 0 };
    if (product?.reviews) {
        product.reviews.forEach((r: any) => {
            const rating = Math.floor(r.rating);
            if (rating >= 1 && rating <= 5) {
                // @ts-ignore
                ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
            }
        });
        ratingCounts.total = product.reviews.length;
    }

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
                    // Set first size as default (check sizeVariants first)
                    if (found.sizeVariants && found.sizeVariants.length > 0) {
                        setSelectedSize(found.sizeVariants[0].size);
                    } else if (found.sizes && found.sizes.length > 0) {
                        setSelectedSize(found.sizes[0]);
                    } else if (found.size) {
                        const sizes = found.size.split(", ").filter((s: string) => s.trim());
                        if (sizes.length > 0) {
                            setSelectedSize(sizes[0]);
                        }
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
        if (!product) return;
        const sizeToAdd = selectedSize || product.size || "";
        const priceToAdd = getCurrentPrice();
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                name: product.name,
                category: product.category,
                price: priceToAdd,
                originalPrice: getCurrentOriginalPrice() ?? undefined,
                image: product.image,
                size: sizeToAdd,
                shippingIncluded: product.shippingIncluded,
                shippingCost: product.shippingCost,
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

        const message = `Merhaba! Bu ürünü satın almak istiyorum:\n\n*${product.name}*\nAdet: ${quantity}\nFiyat: ${(getCurrentPrice() * quantity).toFixed(2)} ₺\n\nÜrün linki: ${window.location.href}`;
        const whatsappUrl = `https://wa.me/905547970558?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };

    // Get current price based on selected size
    const getCurrentPrice = () => {
        if (!product) return 0;
        if (selectedSize && product.sizeVariants) {
            const variant = product.sizeVariants.find(v => v.size === selectedSize);
            if (variant) return variant.price;
        }
        return product.price;
    };

    // Get original price for discount display based on selected size
    const getCurrentOriginalPrice = () => {
        if (!product) return null;
        if (selectedSize && product.sizeVariants) {
            const variant = product.sizeVariants.find(v => v.size === selectedSize);
            if (variant?.originalPrice) return variant.originalPrice;
        }
        return product.originalPrice;
    };

    // Get available sizes from product
    const getAvailableSizes = (): string[] => {
        if (!product) return [];
        if (product.sizeVariants && product.sizeVariants.length > 0) {
            return product.sizeVariants.map(v => v.size);
        }
        if (product.sizes && product.sizes.length > 0) {
            return product.sizes;
        }
        if (product.size) {
            return product.size.split(", ").filter(s => s.trim());
        }
        return [];
    };

    // Get current features based on selected size
    const getCurrentFeatures = (): string[] => {
        if (!product) return [];
        if (selectedSize && product.sizeVariants) {
            const variant = product.sizeVariants.find(v => v.size === selectedSize);
            if (variant?.features && variant.features.length > 0) {
                return variant.features;
            }
        }
        return product.features || [];
    };

    // Helper function to translate technical features
    const translateFeature = (feature: string): string => {
        if (!feature) return "";
        let translated = feature;

        // Map Turkish terms to translation keys
        const termMap: Record<string, string> = {
            "Top çapı": "productSpecs.ballDiameter",
            "Top Çapı": "productSpecs.ballDiameter",
            "Çap": "productSpecs.diameter",
            "Malzeme": "productSpecs.material",
            "Ağırlık": "productSpecs.weight",
            "Katman": "productSpecs.layers",
            "Alt Katman": "productSpecs.baseLayer",
            "Orta Katman": "productSpecs.middleLayer",
            "Üst Katman": "productSpecs.topLayer",
            "Kaymaz Taban": "productSpecs.nonSlipBase",
            "Poliüretan (PU) Köpük": "productSpecs.puFoam",
            "Poliüretan Köpük": "productSpecs.puFoam",
            "Polyester": "productSpecs.polyester",
            "Beden": "productSpecs.size",
            "Renk": "productSpecs.color",
            // Common product specifications
            "Ana Malzeme": "product.mainMaterial",
            "Poliüretan": "product.polyurethane",
            "3 Yaş ve üzeri": "product.ageWarning",
            "Küçük parçalar içerir.": "product.smallPartsWarning",
            "Boğulma tehlikesi vardır.": "product.chokingHazard",
            // Mat layer information
            "Katman Bilgisi": "product.layerInfo",
            "1. Katman: Kaymaz Taban": "product.layer1",
            "1. Katman Kaymaz Taban": "product.layer1",
            "orta katman poliüretan Sünger": "product.layer2",
            "üst katman polyester diye ekleyelim": "product.layer3",
            "2. Katman: Poliüretan Sünger": "product.layer2",
            "3. Katman: Polyester": "product.layer3",
        };

        // 1. Try to match "Label : Value" pattern
        // Matches "Top çapı : 22" or "Malzeme: Plastik"
        const colonMatch = feature.match(/^([^:]+)\s*:\s*(.+)$/);

        if (colonMatch) {
            const label = colonMatch[1].trim(); // e.g., "Top çapı"
            const value = colonMatch[2].trim(); // e.g., "22"

            // If label exists in our map, translate it
            if (termMap[label]) {
                const translatedLabel = t(termMap[label]);

                // Also try to translate the value if it's a known term
                let translatedValue = value;
                // Check if value is in map
                if (termMap[value]) {
                    translatedValue = t(termMap[value]);
                }

                return `${translatedLabel} : ${translatedValue}`;
            }
        }

        // 2. Direct replacement for known phrases if strict match found
        Object.keys(termMap).forEach(term => {
            // If the feature IS exactly one of our terms
            if (feature.trim() === term) {
                translated = t(termMap[term]);
            }
            // If feature contains the term (be careful with partial matches)
            else if (feature.includes(term)) {
                // Only replace if we haven't already completely replaced it via colon match
                // For now, let's just replace the term if found
                // Regex to replace only whole words or specific phrases could be safer
                translated = translated.replace(term, t(termMap[term]));
            }
        });

        return translated;
    };

    const getDiscountPercent = () => {
        const original = getCurrentOriginalPrice();
        const current = getCurrentPrice();
        if (original && original > current) {
            return Math.round(((original - current) / original) * 100);
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

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        setIsSubmittingReview(true);
        try {
            const res = await fetch("/api/products/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: product.id,
                    ...reviewForm
                }),
            });

            const data = await res.json();

            if (data.success) {
                setProduct(data.product);
                setReviewForm({ userName: "", rating: 5, comment: "" });
                // Optional: Show success toast
            } else {
                alert("Yorum eklenirken bir hata oluştu: " + data.error);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Bir hata oluştu.");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-primary text-5xl animate-spin">progress_activity</span>
                    <p className="text-gray-400 mt-4">{t('product.loading')}</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-gray-600 text-6xl mb-4">error</span>
                <h1 className="text-2xl font-bold text-white mb-2">{t('product.notFound')}</h1>
                <p className="text-gray-400 mb-6">{t('product.notFoundDesc')}</p>
                <Link href="/shop/catalog" className="px-6 py-3 bg-primary text-black font-bold rounded-xl">
                    {t('product.backToShop')}
                </Link>
            </div>
        );
    }

    const allMedia = getAllMedia();
    const discount = getDiscountPercent();
    const displayRating = product.reviews && product.reviews.length > 0 ? product.rating : 0;

    return (
        <div className="min-h-screen bg-background-dark">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-surface-dark/95 backdrop-blur-md px-4 py-4 md:px-6 lg:px-12">
                <div className="flex items-center gap-4 md:gap-8">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/Logos/logo(beyaz).png"
                            alt="Strive"
                            width={120}
                            height={42}
                            className="h-10 w-auto"
                        />
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-300 text-sm font-medium uppercase tracking-wide transition hover:text-primary">{t('nav.home')}</Link>
                        <Link href="/shop/catalog" className="text-primary text-sm font-bold uppercase tracking-wide transition hover:text-white">{t('nav.shop')}</Link>
                        <Link href="/about" className="text-gray-300 text-sm font-medium uppercase tracking-wide transition hover:text-white">{t('nav.about')}</Link>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-6 ml-2">
                            <button
                                onClick={() => setLocale('tr')}
                                className={`text-xs font-bold transition-colors ${locale === 'tr' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
                            >
                                TR
                            </button>
                            <span className="text-gray-700">|</span>
                            <button
                                onClick={() => setLocale('en')}
                                className={`text-xs font-bold transition-colors ${locale === 'en' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
                            >
                                EN
                            </button>
                        </div>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/cart" className="flex items-center justify-center rounded-full p-2 text-gray-300 hover:bg-white/10 hover:text-white transition relative">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                                {totalItems > 99 ? "99+" : totalItems}
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-white hover:text-primary transition"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Mobile Menu Panel */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-surface-dark z-[70] md:hidden transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <span className="text-lg font-bold text-white">{t('header.menu')}</span>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                                <button
                                    onClick={() => setLocale('tr')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${locale === 'tr' ? 'bg-primary text-black' : 'text-gray-400'}`}
                                >
                                    TR
                                </button>
                                <button
                                    onClick={() => setLocale('en')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${locale === 'en' ? 'bg-primary text-black' : 'text-gray-400'}`}
                                >
                                    EN
                                </button>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white transition">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 py-6">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
                            <span className="material-symbols-outlined">home</span>
                            <span className="font-medium">{t('nav.home')}</span>
                        </Link>
                        <Link href="/shop/catalog" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-primary hover:bg-white/5 transition">
                            <span className="material-symbols-outlined">storefront</span>
                            <span className="font-medium">{t('nav.shop')}</span>
                        </Link>
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
                            <span className="material-symbols-outlined">info</span>
                            <span className="font-medium">{t('nav.about')}</span>
                        </Link>
                        <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            <span className="font-medium">{t('nav.cart')}</span>
                            {totalItems > 0 && <span className="ml-auto px-2 py-1 bg-primary text-black text-xs font-bold rounded-full">{totalItems}</span>}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 lg:px-12">
                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap items-center gap-2 pb-6 text-sm">
                        <Link href="/" className="text-gray-400 hover:text-primary transition">{t('nav.home')}</Link>
                        <span className="text-gray-600">/</span>
                        <Link href="/shop/catalog" className="text-gray-400 hover:text-primary transition">{t('nav.shop')}</Link>
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
                                    <span className="rounded bg-primary px-3 py-1 text-xs font-bold uppercase text-black">{product.category}</span>
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
                                                style={i < Math.floor(displayRating) ? { fontVariationSettings: "'FILL' 1" } : undefined}
                                            >
                                                {i < Math.floor(displayRating) ? "star" : i < displayRating ? "star_half" : "star_border"}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-400">{displayRating.toFixed(1)}</span>
                                </div>
                                <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-5xl">{product.name}</h1>
                                <p className="text-lg font-light text-gray-300">{product.description || product.category}</p>
                            </div>

                            {/* Price & Actions */}
                            <div className="space-y-6 py-2">
                                <div className="flex items-end gap-4">
                                    <p className="text-4xl font-bold text-primary font-body">{getCurrentPrice().toFixed(2)} ₺</p>
                                    {getCurrentOriginalPrice() && getCurrentOriginalPrice()! > getCurrentPrice() && (
                                        <>
                                            <p className="mb-1 text-lg text-gray-500 line-through font-body">{getCurrentOriginalPrice()!.toFixed(2)} ₺</p>
                                            <span className="mb-2 rounded bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-500">-{discount}%</span>
                                        </>
                                    )}
                                </div>
                                {/* Shipping Badge */}
                                {product.shippingIncluded && (
                                    <div className="flex items-center gap-2 text-green-500 mt-2">
                                        <span className="material-symbols-outlined text-lg">local_shipping</span>
                                        <span className="text-sm font-medium">{t('product.shippingIncluded')}</span>
                                    </div>
                                )}

                                {/* Specs Grid Mini */}
                                <div className="grid grid-cols-2 gap-4 rounded-xl bg-surface-dark p-4 border border-white/10">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-500">{t('product.availableSizes')}</span>
                                        <span className="font-bold text-white">
                                            {product.size || "-"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-500">{t('product.courtType')}</span>
                                        <span className="font-bold text-white">{product.category}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-500">{t('product.category')}</span>
                                        <span className="font-bold text-white">{product.category}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-gray-500">{t('product.status')}</span>
                                        <span className={`font-bold ${product.inStock ? "text-green-400" : "text-red-400"}`}>
                                            {product.inStock ? t('admin.inStock') : t('admin.outOfStock')}
                                        </span>
                                    </div>
                                </div>

                                {/* Size Selector */}
                                {getAvailableSizes().length > 1 && (
                                    <div>
                                        <label className="mb-2 block text-xs font-medium uppercase text-gray-500">{t('product.selectSize')}</label>
                                        <div className="flex flex-wrap gap-2">
                                            {getAvailableSizes().map((size) => {
                                                const variant = product.sizeVariants?.find(v => v.size === size);
                                                return (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all flex flex-col items-center ${selectedSize === size
                                                            ? "bg-primary border-primary text-black"
                                                            : "bg-surface-dark border-white/20 text-white hover:border-primary"
                                                            }`}
                                                    >
                                                        <span>{size}</span>
                                                        {variant && (
                                                            <span className={`text-xs ${selectedSize === size ? "text-black/70" : "text-gray-400"}`}>
                                                                {variant.price.toFixed(0)} ₺
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div className="flex gap-4">
                                    <div className="w-32">
                                        <label className="mb-1 block text-xs font-medium uppercase text-gray-500">{t('product.quantity')}</label>
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
                                        {addedToCart ? t('common.added') : t('common.addToCart')}
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
                                    <span className="text-lg font-bold uppercase tracking-wide">{t('product.buyWithWhatsApp')}</span>
                                </button>

                                <p className="text-center text-xs text-gray-500">{t('product.freeShipping')}</p>
                            </div>

                            {/* Accordion Items */}
                            <div className="divide-y divide-white/10 border-t border-white/10 pt-2">
                                {/* Product Details */}
                                <details className="group py-4" open>
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-white marker:content-none hover:text-primary">
                                        <span>{t('product.productDetails')}</span>
                                        <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <div className="pt-3 text-sm leading-relaxed text-gray-400">
                                        {getCurrentFeatures().length > 0 ? (
                                            <ul className="list-disc space-y-2 pl-4 marker:text-primary">
                                                {getCurrentFeatures().map((feature, index) => (
                                                    <li key={index}>{translateFeature(feature)}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>{product.description || t('product.noDetails')}</p>
                                        )}
                                        {selectedSize && product.sizeVariants?.find(v => v.size === selectedSize)?.features && (
                                            <p className="text-xs text-primary mt-3 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">info</span>
                                                {t('product.sizeSpecificFeatures').replace('{size}', selectedSize)}
                                            </p>
                                        )}
                                    </div>
                                </details>

                                {/* Reviews Section */}
                                <div className="hidden">
                                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">rate_review</span>
                                        {t('product.reviewsTitle')}
                                        <span className="text-gray-500 text-lg font-normal">({product.reviews?.length || 0})</span>
                                    </h3>
                                    <div>
                                        {/* Reviews List */}
                                        <div className="space-y-6 mb-8">
                                            {product.reviews && product.reviews.length > 0 ? (
                                                product.reviews.map((review) => (
                                                    <div key={review.id} className="bg-white/5 rounded-xl p-4">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <div className="font-bold text-white">{review.userName}</div>
                                                                <div className="flex text-yellow-400 text-sm">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <span key={i} className="material-symbols-outlined text-[16px] w-[16px] overflow-hidden">
                                                                            {i < review.rating ? "star" : "star_border"}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {new Date(review.date).toLocaleDateString("tr-TR")}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-300 text-sm">{review.comment}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-500 text-sm italic">{t('product.noReviews')}</p>
                                            )}
                                        </div>

                                        {/* Add Review Form */}
                                        <div className="bg-surface-dark border border-white/10 rounded-xl p-5">
                                            <h4 className="font-bold text-white mb-4">{t('product.writeReview')}</h4>
                                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t('product.ratingLabel')}</label>
                                                    <div className="flex gap-2">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                                className={`material-symbols-outlined text-2xl transition hover:scale-110 ${star <= reviewForm.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                                                                    }`}
                                                            >
                                                                star
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t('product.yourName')}</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={reviewForm.userName}
                                                        onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                                                        className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary text-sm"
                                                        placeholder={t('product.yourName')}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{t('product.yourComment')}</label>
                                                    <textarea
                                                        required
                                                        value={reviewForm.comment}
                                                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                                        className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary text-sm h-24 resize-none"
                                                        placeholder={t('product.yourComment') + "..."}
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmittingReview}
                                                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                                                >
                                                    {isSubmittingReview ? (
                                                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                                    ) : (
                                                        <>
                                                            <span className="material-symbols-outlined">send</span>
                                                            {t('product.submitReview')}
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping & Returns */}
                                <details className="group py-4">
                                    <summary className="flex cursor-pointer items-center justify-between font-bold text-white marker:content-none hover:text-primary">
                                        <span>{t('product.shippingReturns')}</span>
                                        <span className="material-symbols-outlined transition group-open:rotate-180">expand_more</span>
                                    </summary>
                                    <div className="pt-3 text-sm leading-relaxed text-gray-400">
                                        {t('product.shippingText')}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-24 border-t border-white/10 pt-12">
                        <h3 className="mb-8 text-2xl font-black uppercase text-white">{t('product.reviewsTitle')}</h3>
                        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
                            {/* Summary */}
                            <div className="w-full lg:w-1/3">
                                <div className="rounded-2xl bg-surface-dark p-8 border border-white/10">
                                    <div className="flex items-end gap-3 mb-2">
                                        <span className="text-6xl font-black text-white">{displayRating.toFixed(1)}</span>
                                        <div className="mb-2 flex text-primary">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: i < displayRating ? "'FILL' 1" : "'FILL' 0" }}>
                                                    {i < Math.floor(displayRating) ? "star" : i < displayRating ? "star_half" : "star_border"}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 mb-6">{t('product.basedOnReviews').replace("215", ratingCounts.total.toString())}</p>
                                    <div className="space-y-3">
                                        {[5, 4, 3, 2, 1].map((star) => {
                                            // @ts-ignore
                                            const count = ratingCounts[star] || 0;
                                            const percent = ratingCounts.total > 0 ? Math.round((count / ratingCounts.total) * 100) : 0;
                                            return (
                                                <div key={star} className="grid grid-cols-[20px_1fr_40px] items-center gap-3 text-sm">
                                                    <span className="text-white">{star}</span>
                                                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                                                        <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }}></div>
                                                    </div>
                                                    <span className="text-right text-gray-400">{percent}%</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Reviews List and Form */}
                            <div className="flex-1 space-y-8">
                                <div className="space-y-6">
                                    {product.reviews && product.reviews.length > 0 ? (
                                        product.reviews.map((review) => (
                                            <div key={review.id} className="border-b border-white/10 pb-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-bold text-white">{review.userName}</h4>
                                                    <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString("tr-TR")}</span>
                                                </div>
                                                <div className="flex text-primary mb-3 text-sm">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0" }}>
                                                            star
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-gray-400 leading-relaxed">{review.comment}</p>
                                                <div className="mt-4 flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                                        {review.userName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-300">{review.userName}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm italic">{t('product.noReviews')}</p>
                                    )}
                                </div>

                                {/* Add Review Form */}
                                <div className="bg-surface-dark border border-white/10 rounded-xl p-8 mt-8">
                                    <h4 className="text-xl font-bold text-white mb-6">{t('product.writeReview')}</h4>
                                    <form onSubmit={handleSubmitReview} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold uppercase text-gray-400 mb-2">{t('product.ratingLabel')}</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                        className={`material-symbols-outlined text-3xl transition hover:scale-110 ${star <= reviewForm.rating ? "text-primary fill-current" : "text-gray-600"}`}
                                                        style={{ fontVariationSettings: star <= reviewForm.rating ? "'FILL' 1" : "'FILL' 0" }}
                                                    >
                                                        star
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold uppercase text-gray-400 mb-2">{t('product.yourName')}</label>
                                            <input
                                                type="text"
                                                required
                                                value={reviewForm.userName}
                                                onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                                placeholder={t('product.yourName')}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold uppercase text-gray-400 mb-2">{t('product.yourComment')}</label>
                                            <textarea
                                                required
                                                value={reviewForm.comment}
                                                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                                className="w-full bg-background-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition h-32 resize-none"
                                                placeholder={t('product.yourComment') + "..."}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmittingReview}
                                            className="w-full py-4 bg-primary hover:bg-primary-light text-black font-bold rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wide"
                                        >
                                            {isSubmittingReview ? (
                                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined">send</span>
                                                    {t('product.submitReview')}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
