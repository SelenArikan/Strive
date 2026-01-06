"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  badgeColor?: string;
}

interface HeaderProps {
  hideSearch?: boolean;
}

export default function Header({ hideSearch = false }: HeaderProps) {
  const { totalItems } = useCart();
  const { t, locale, setLocale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router]);

  const filteredProducts = searchQuery
    ? products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4)
    : products.slice(0, 4); // Show top 4 if empty

  const handleProductClick = (productId: number) => {
    router.push("/shop/catalog");
    setShowSuggestions(false);
  };

  const handleViewAll = () => {
    router.push("/shop/catalog");
    setShowSuggestions(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-[#0b1612]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black">
                <span className="material-symbols-outlined">sports_basketball</span>
              </div>
              <span className="font-body font-extrabold text-2xl tracking-tight text-white">Strive</span>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex space-x-12 items-center">
              <Link href="/" className="text-base font-medium text-white hover:text-primary transition">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-base font-medium text-gray-300 hover:text-primary transition">
                {t('nav.about')}
              </Link>
              <Link href="/shop" className="text-base font-medium text-gray-300 hover:text-primary transition">
                {t('nav.shop')}
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 md:space-x-6" ref={dropdownRef}>
              {!hideSearch && (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className="text-gray-300 hover:text-white transition"
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
                              <span className="text-sm font-bold text-primary whitespace-nowrap">
                                ₺{product.price.toFixed(2)}
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
              )}

              {/* Language Switcher */}
              <div className="flex items-center gap-1 border border-white/10 rounded-lg p-1">
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

              {/* Cart */}
              <Link href="/cart" className="relative group cursor-pointer">
                <div className="p-2 bg-surface-dark rounded-full border border-white/10 group-hover:border-primary/50 transition">
                  <span className="material-symbols-outlined text-white">shopping_cart</span>
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-primary transition"
              >
                <span className="material-symbols-outlined text-2xl">
                  {mobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-surface-dark z-50 md:hidden transform transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-lg font-bold text-white">{t('header.menu')}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/5 hover:text-primary transition"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="font-medium">{t('nav.home')}</span>
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition"
            >
              <span className="material-symbols-outlined">storefront</span>
              <span className="font-medium">{t('nav.shop')}</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition"
            >
              <span className="material-symbols-outlined">info</span>
              <span className="font-medium">{t('nav.about')}</span>
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="font-medium">{t('nav.cart')}</span>
              {totalItems > 0 && (
                <span className="ml-auto px-2 py-1 bg-primary text-black text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Language Switcher - Mobile */}
            <div className="px-6 py-4">
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

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black">
                <span className="material-symbols-outlined text-sm">sports_basketball</span>
              </div>
              <span className="font-bold text-white">Strive</span>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
