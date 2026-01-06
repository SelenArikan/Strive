"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/hooks/useLanguage";

interface Product {
  id: number;
  name: string;
  category: string;
  size: number;
  courtType: string;
  price: number;
  originalPrice?: number;
  rating: number;
  badge?: string;
  badgeColor?: string;
  description?: string;
  features?: string[];
  image: string;
  inStock: boolean;
}

export default function ShopLandingPage() {
  const { t, locale, setLocale } = useLanguage();
  const { totalItems } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<number>(7);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setFeaturedProducts((data.products || []).slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden antialiased selection:bg-primary selection:text-white min-h-screen">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full p-6">
        <div className="flex items-start justify-between">
          <nav className="hidden md:flex gap-4">
            <Link
              href="/"
              className="border border-white/20 bg-background-dark/80 px-6 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/about"
              className="border border-white/20 bg-background-dark/80 px-6 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/shop/catalog"
              className="border border-white/20 bg-background-dark/80 px-6 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
            >
              {t('nav.shop')}
            </Link>
          </nav>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden border border-white/20 bg-background-dark/80 p-2 text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex items-center gap-6">
            <Link href="/shop/catalog" className="hidden lg:flex flex-col items-center gap-2 cursor-pointer">
              <div className="relative size-16 overflow-hidden rounded-xl border border-white/20 bg-white/5 backdrop-blur-md">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB4TscEv3-G12c9Hobyl6vZZDZrmlSDmszmyZWiKVnOzOR0oQTdWqwQeCqv0_WdNId4b8zyr3HNKYXyYwXwv-B2mArLD-QVwfVmtlgaNeuxOEkn8AggmIMkPFDWDMt486bbTfnScchz52I-iunCCnTZZeVFIml_0QLmMDyW7JaBUHROvhV5rZIArKmwcNYUhOZLzlUq2G-rCFA6V7meF3sbLUF9iFOE9C697te493J-jEhQkl49NFKkYI9C72CZREJmRcRFxM0oig"
                  alt="Mini product preview"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary" style={{ writingMode: "vertical-rl" }}>{t('nav.shop')}</span>
                <span className="material-symbols-outlined text-sm mt-1 animate-bounce">arrow_downward</span>
              </div>
            </Link>
            {/* Language Switcher */}
            <div className="hidden lg:flex items-center gap-1 border border-white/20 bg-background-dark/80 backdrop-blur-md rounded-lg p-1">
              <button
                onClick={() => setLocale('tr')}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all ${locale === 'tr'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                TR
              </button>
              <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all ${locale === 'en'
                  ? 'bg-primary text-black'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                EN
              </button>
            </div>

            <div className="flex items-center bg-black text-white px-6 py-3 gap-6">
              <Link href="/cart" className="relative cursor-pointer group">
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">shopping_cart</span>
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 size-4 bg-primary text-[10px] font-bold flex items-center justify-center rounded-full text-black">
                    {totalItems}
                  </div>
                )}
              </Link>
            </div>
          </div>
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
            <span className="text-lg font-bold text-white">{t('common.menu')}</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white transition">
              <span className="material-symbols-outlined">close</span>
            </button>
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

            {/* Language Switcher - Mobile */}
            <div className="px-6 py-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLocale('tr')}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-bold uppercase transition-all ${locale === 'tr'
                    ? 'bg-primary text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  Türkçe
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-bold uppercase transition-all ${locale === 'en'
                    ? 'bg-primary text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  English
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative flex-grow flex flex-col pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
        {/* Decorative Elements */}
        <div className="absolute top-40 left-10 hidden xl:flex flex-col gap-4 text-xs font-mono text-gray-500">
          <div className="size-3 rounded-full bg-white/20"></div>
          <div className="size-3 rounded-full bg-white/20"></div>
          <div className="size-3 rounded-full bg-white/20"></div>
        </div>
        <div className="absolute top-40 right-10 hidden xl:block text-right">
          <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">&lt;100&gt; New Collections of Outdoor Gear</div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400">&lt;300&gt; Engineered for Elite Performance</div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 min-h-[70vh]">
          {/* Left Column - Text */}
          <div className="lg:col-span-5 flex flex-col justify-end pb-12 relative z-20">
            <div className="mb-6 w-32 h-8 bg-white/10" style={{
              backgroundImage: "repeating-linear-gradient(90deg, currentColor 0, currentColor 2px, transparent 2px, transparent 4px, currentColor 4px, currentColor 8px, transparent 8px, transparent 10px)"
            }}></div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-white mb-6">
              {t('shop.heroTitle1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">{t('shop.heroTitle2')}</span> <br />
              {t('shop.heroTitle3')}
            </h1>
            <div className="space-y-2 mb-10 pl-1 border-l-2 border-primary/50">
              <p className="text-sm text-gray-400 font-mono">*** {t('shop.heroSubtitle1')}</p>
              <p className="text-sm text-gray-400 font-mono">...{t('shop.heroSubtitle2')}</p>
              <p className="text-sm text-gray-400 font-mono">{t('shop.heroSubtitle3')}</p>
            </div>
            <Link
              href="/shop/catalog"
              className="group w-fit flex items-center gap-4 bg-black border border-white/20 rounded-full pl-6 pr-2 py-2 hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <span className="text-sm font-bold uppercase tracking-wider">{t('common.shopNow')}</span>
              <span className="flex items-center justify-center size-8 bg-white text-black rounded-full group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm font-bold">arrow_outward</span>
              </span>
            </Link>
          </div>

          {/* Center Column - Hero Image */}
          <div className="lg:col-span-4 relative flex items-center justify-center min-h-[400px]">
            <div className="absolute top-10 left-0 w-px h-20 bg-gray-700 hidden lg:block"></div>
            <div className="absolute top-10 left-0 w-20 h-px bg-gray-700 hidden lg:block"></div>
            <div className="absolute top-20 left-10 hidden lg:flex flex-col items-center">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">{t('shop.officialSizeWeight')}</p>
            </div>

            <div className="relative z-10 w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse"></div>
              <Image
                src="/Gemini_Generated_Image_9mufdw9mufdw9muf.png"
                alt="Elite Basketball"
                fill
                className="object-contain drop-shadow-2xl animate-pulse"
              />
              <div className="absolute top-1/4 right-10 flex items-center gap-2 group cursor-pointer">
                <div className="size-2 bg-green-400 rounded-full animate-ping"></div>
                <div className="bg-black/80 backdrop-blur border border-white/10 px-3 py-1 rounded text-[10px] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {t('shop.enhancedGripTexture')}
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 right-10 hidden lg:block">
              <div className="border-b border-r border-gray-600 w-8 h-8"></div>
              <span className="absolute -top-6 right-0 text-[10px] font-mono text-primary">2024</span>
            </div>
          </div>

          {/* Right Column - Size Selector & Info */}
          <div className="lg:col-span-3 flex flex-col justify-between py-10 relative z-20">
            <div className="flex flex-col gap-6 items-end">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] uppercase tracking-widest text-right text-gray-500 italic">{t('shop.selectSize')}</p>
                <div className="flex flex-col gap-2">
                  {[5, 6, 7].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-8 rounded-full border text-xs font-mono flex items-center justify-center transition-colors ${selectedSize === size
                        ? "border-primary bg-primary text-black font-bold"
                        : "border-gray-700 text-gray-400 hover:border-primary hover:bg-primary hover:text-black"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col items-end gap-4">
              <div className="w-full max-w-[240px] border border-white/10 bg-white/5 backdrop-blur-sm p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
                  <div className="flex gap-1">
                    <span className="material-symbols-outlined text-lg">fast_forward</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="size-2 rounded-full bg-red-500 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 font-mono leading-relaxed mb-3">
                  &gt; {t('shop.proLeagueSpecs')}<br />
                  &gt; {t('shop.moistureManagement')}<br />
                  &gt; {t('shop.deepChannelDesign')}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="size-6 rounded-full border border-black bg-gray-800"></div>
                    <div className="size-6 rounded-full border border-black bg-primary"></div>
                  </div>
                  <span className="material-symbols-outlined text-sm">tune</span>
                </div>
              </div>

              <Link href="/shop/catalog" className="w-full max-w-[240px] relative group cursor-pointer overflow-hidden rounded-lg block">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM7OMM5Tez6O94k9WDugIdd1BgQ24oEPwqCbU4sd1ZBN1My-mKHwLmF8vbFqTkv7q8uf4GEYuDqi3AkHuGeCdnHLJ9pc9SgkafsPbcA1a2GRBEF-UfBRSOJxBJG1FMMd_Gx7IrQQcXt70Do8ooCpSh3G1ETgbXWA-gp469oH6JLnCQMYW95ZOfyKser-YmfGDdN-fOUHja-mxmrvTOK23457JdHS62d4vN4gOWDYSi855e23_9CEnDkBtv8Ql6K8-haBh2FsIcHJA"
                  alt="Action Shot"
                  width={240}
                  height={128}
                  className="w-full h-32 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-3xl">play_circle</span>
                </div>
                <button className="absolute top-2 right-2 text-white">
                  <span className="material-symbols-outlined text-sm">favorite</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
            <h2 className="text-2xl font-bold uppercase italic">{t('shop.featuredProducts')}</h2>
            <div className="flex items-center gap-2 overflow-x-auto">
              <button className="px-4 py-2 bg-white text-black text-xs font-bold uppercase rounded-full">{t('shop.all')}</button>
              <button className="px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white text-xs font-bold uppercase rounded-full transition-all">{t('shop.indoorSeries')}</button>
              <button className="px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white text-xs font-bold uppercase rounded-full transition-all">{t('shop.outdoorSeries')}</button>
              <button className="px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white text-xs font-bold uppercase rounded-full transition-all">3X3</button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href="/shop/catalog"
                className="group relative bg-surface-dark rounded-xl overflow-hidden hover:ring-1 hover:ring-primary transition-all duration-300"
              >
                <div className="aspect-[4/5] bg-background-dark p-6 relative flex items-center justify-center">
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold ${product.badgeColor || 'bg-primary'} text-black px-2 py-0.5 rounded uppercase`}>
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  <button className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white">
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold uppercase text-white">{product.name}</h3>
                    <span className="text-primary font-bold">₺{product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-12">
            <Link
              href="/shop/catalog"
              className="group flex items-center gap-3 border border-white/20 rounded-full px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="text-sm font-bold uppercase tracking-wider">{t('common.viewAllProducts')}</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
