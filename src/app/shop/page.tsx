"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import ProductCarousel from "@/components/ProductCarousel";

interface Product {
  id: number;
  name: string;
  category: string;
  size: string;
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
  const { totalItems, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const whatsappNumber = "905547970558";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products for search suggestions
  const filteredProducts = searchQuery
    ? products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4)
    : products.slice(0, 4);

  const handleProductClick = (productId: number) => {
    router.push(`/shop/product/${productId}`);
    setShowSuggestions(false);
  };

  const handleViewAll = () => {
    router.push("/shop/catalog");
    setShowSuggestions(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark font-display text-white overflow-x-hidden antialiased selection:bg-primary selection:text-white">
      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setShowVideoModal(false)}>
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <video
              autoPlay
              controls
              className="w-full rounded-2xl"
            >
              <source src="/videos/WebSite_VideoRevize.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#393028] bg-[#181411]/90 backdrop-blur-md px-4 sm:px-10 py-3">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center gap-4 text-white">
            <Image
              src="/Logos/logo(beyaz).png"
              alt="Strive"
              width={120}
              height={42}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            <Link href="/" className="text-white hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide leading-normal">{t('nav.home')}</Link>
            <Link href="/about" className="text-white hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide leading-normal">{t('nav.about')}</Link>
            <Link href="/shop" className="text-primary text-sm font-bold uppercase tracking-wide leading-normal border-b-2 border-primary">{t('nav.shop')}</Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide leading-normal">{t('shop.contact')}</a>
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-4 lg:gap-6 items-center">
          {/* Search - Desktop only */}
          <div className="relative hidden lg:block" ref={dropdownRef}>
            <button
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="flex items-center justify-center size-10 rounded-full bg-[#2a231d] text-[#baab9c] hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">search</span>
            </button>

            {/* Search Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full right-0 mt-4 w-[350px] bg-surface-dark border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-3 border-b border-white/10">
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-background-dark border border-white/10 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-primary"
                    placeholder={t('common.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="px-4 py-2 flex justify-between items-center text-xs text-gray-400 border-b border-white/10">
                  <span className="font-bold uppercase tracking-wider">{t('header.suggestions')}</span>
                  <span>{filteredProducts.length} {t('header.foundResults')}</span>
                </div>

                <div className="flex flex-col max-h-[300px] overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors group border-b border-white/5 last:border-0"
                      >
                        <div className="w-12 h-12 rounded bg-white/5 relative overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            {product.badge && (
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${product.badgeColor || 'bg-primary text-black'}`}>
                                {product.badge}
                              </span>
                            )}
                            <span className="truncate">{product.category}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-primary whitespace-nowrap font-body">
                          {product.price.toFixed(2)} ₺
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500 text-sm">
                      {t('header.noProducts')}
                    </div>
                  )}
                </div>

                <div className="p-3">
                  <button
                    onClick={handleViewAll}
                    className="w-full py-3 bg-primary hover:bg-green-400 text-black font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    {t('common.viewAllProducts')}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Language Switcher - Desktop */}
          <div className="hidden md:flex items-center gap-1 border border-white/10 rounded-lg p-1">
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
          <div className="flex gap-2">
            <Link href="/cart" className="group relative flex size-10 items-center justify-center rounded-full bg-[#2a231d] text-white hover:bg-primary transition-colors">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">shopping_cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden group flex size-10 items-center justify-center rounded-full bg-[#2a231d] text-white hover:bg-primary transition-colors"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">menu</span>
            </button>
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
            <span className="text-lg font-bold text-white">{t('header.menu')}</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white transition">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 py-6">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
              <span className="material-symbols-outlined">home</span>
              <span className="font-medium">{t('nav.home')}</span>
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
              <span className="material-symbols-outlined">info</span>
              <span className="font-medium">{t('nav.about')}</span>
            </Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-primary hover:bg-white/5 transition">
              <span className="material-symbols-outlined">storefront</span>
              <span className="font-medium">{t('nav.shop')}</span>
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
              <span className="material-symbols-outlined">chat</span>
              <span className="font-medium">{t('shop.contact')}</span>
            </a>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="font-medium">{t('nav.cart')}</span>
              {totalItems > 0 && <span className="ml-auto px-2 py-1 bg-primary text-black text-xs font-bold rounded-full">{totalItems}</span>}
            </Link>

            {/* Language Switcher - Mobile */}
            <div className="px-6 py-4 border-t border-white/10 mt-4">
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

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] w-full overflow-hidden bg-[#0d0d0d]">
          {/* Basketball Court Background - Transparent Overlay */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2690&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover opacity-20"
              aria-hidden="true"
              priority
            />
          </div>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#0d0d0d]/85 to-[#1a1815]/70"></div>


          <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 sm:px-10 py-24 lg:flex-row lg:items-center">
            {/* Left Content */}
            <div className="flex flex-1 flex-col justify-center space-y-8 lg:max-w-xl">
              {/* Tagline with orange line */}
              <div className="flex items-center gap-3">
                <span className="inline-block h-[2px] w-8 bg-primary"></span>
                <span className="text-primary text-xs font-bold tracking-[0.25em] uppercase">STRIVE FOR SUCCESS</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-[0.95] tracking-tight">
                <span className="text-white">{t('shop.unleashTitle1')}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a08070] via-[#7a6a5a] to-[#504540] italic">{t('shop.unleashTitle2')}</span>
              </h1>

              {/* Description */}
              <p className="max-w-md text-gray-500 text-sm sm:text-base leading-relaxed">
                {t('shop.heroDescription')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/shop/catalog"
                  className="flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-black hover:bg-[#ff8c1a] hover:scale-105 transition-all shadow-[0_0_30px_rgba(242,127,13,0.4)]"
                >
                  {t('shop.shopCollection')}
                </Link>
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="flex items-center gap-3 rounded-full border border-[#3a3530] bg-[#1a1816] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:border-white/30 hover:bg-[#252220] transition-all"
                >
                  {t('shop.watchFilm')}
                  <span className="flex items-center justify-center w-6 h-6 rounded-full border border-white/30">
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Right - Basketball Image with Orange Glow and Float Animation */}
            <div className="relative mt-16 flex flex-1 justify-center lg:mt-0 lg:justify-end">
              {/* Orange Glow Effect - Pulsing */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-radial from-primary/40 via-primary/20 to-transparent rounded-full blur-[80px] pointer-events-none animate-pulse-slow"></div>

              {/* Secondary Orange Glow - Outer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-gradient-radial from-orange-500/20 via-orange-600/10 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

              {/* Basketball with Float Animation */}
              <div className="basketball-float relative z-10">
                <Image
                  src="/Gemini_Generated_Image_9mufdw9mufdw9muf.png"
                  alt="Strive Basketball"
                  width={500}
                  height={500}
                  className="max-w-[280px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[500px] drop-shadow-[0_30px_60px_rgba(242,127,13,0.4)]"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Filter Bar */}
        <div className="sticky top-[72px] z-40 w-full border-y border-[#2a2520] bg-[#0d0d0d]">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 sm:px-10 py-4">
            <div className="flex items-center gap-3">
              {[
                { key: 'all', label: t('shop.all') },
                { key: 'indoor', label: t('shop.indoor') },
                { key: 'outdoor', label: t('shop.outdoor') },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex h-10 shrink-0 items-center justify-center rounded-full px-5 transition-all duration-200 ${activeFilter === filter.key
                    ? 'bg-white text-black font-bold'
                    : 'border border-[#3a3530] bg-transparent text-white/80 hover:border-white/40 hover:text-white'
                    }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">{filter.label}</span>
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('shop.sortBy')}</span>
              <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-primary transition-colors">
                {t('catalog.featured')} <span className="material-symbols-outlined text-lg">keyboard_arrow_down</span>
              </button>
            </div>
          </div>
        </div>

        {/* Shop Content - Using ProductCarousel component */}
        <ProductCarousel />
      </main>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        .basketball-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .product-card:hover .quick-add-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .product-image {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
}
