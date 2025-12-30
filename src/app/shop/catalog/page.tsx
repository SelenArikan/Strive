"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  category: string;
  size: number;
  courtType: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  description?: string;
  features?: string[];
  image: string;
  inStock: boolean;
  createdAt?: string;
}

const courtTypes = [
  { label: "Indoor (Pro)", checked: true },
  { label: "Outdoor (Street)", checked: false },
  { label: "Hybrid / All-Surface", checked: false },
  { label: "3x3 Official", checked: false },
];

const sizes = [
  { label: "Size 3 (Mini)", value: 3 },
  { label: "Size 5 (Youth)", value: 5 },
  { label: "Size 6 (Women's)", value: 6 },
  { label: "Size 7 (Men's)", value: 7 },
];

// Check if product is new (within 5 days)
const isNewProduct = (createdAt?: string) => {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 5;
};

// Calculate discount percentage
const getDiscountPercent = (product: Product) => {
  if (product.originalPrice && product.originalPrice > product.price) {
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }
  return 0;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, totalItems } = useCart();
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [selectedCourtTypes, setSelectedCourtTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | null>(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Fetch products from API
  useEffect(() => {
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
    fetchProducts();
  }, []);

  const toggleCourtType = (label: string) => {
    setSelectedCourtTypes(prev =>
      prev.includes(label)
        ? prev.filter(t => t !== label)
        : [...prev, label]
    );
  };

  const toggleSize = (value: number) => {
    setSelectedSizes(prev =>
      prev.includes(value)
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      image: product.image,
      size: product.size,
    });

    setAddedItems((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  const handlePriceApply = () => {
    setAppliedMinPrice(minPrice ? parseFloat(minPrice) : null);
    setAppliedMaxPrice(maxPrice ? parseFloat(maxPrice) : null);
  };

  const filteredSortedProducts = products
    .filter((product) => {
      // Search Filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Court Type Filter
      if (selectedCourtTypes.length > 0 && !selectedCourtTypes.includes(product.courtType)) {
        return false;
      }

      // Size Filter
      if (selectedSizes.length > 0 && !selectedSizes.includes(product.size)) {
        return false;
      }

      // Price Filter
      if (appliedMinPrice !== null && product.price < appliedMinPrice) {
        return false;
      }
      if (appliedMaxPrice !== null && product.price > appliedMaxPrice) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Newest Arrivals":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default: // Featured
          return b.rating - a.rating;
      }
    });

  const totalPages = Math.ceil(filteredSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCourtTypes, selectedSizes, appliedMinPrice, appliedMaxPrice, sortBy]);


  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-slate-50/90 dark:bg-background-dark/90 border-b border-slate-200 dark:border-white/5">
        <div className="px-4 md:px-10 py-3 flex items-center justify-between mx-auto max-w-[1440px]">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-black">
                <span className="material-symbols-outlined">sports_basketball</span>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                Strive
              </h2>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Anasayfa
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                Hakkımızda
              </Link>
              <Link href="/shop" className="text-sm font-bold text-primary transition-colors">
                Shop
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-full h-full bg-slate-200 dark:bg-surface-dark border dark:border-white/10 transition-shadow">
                <div className="text-slate-500 dark:text-gray-400 flex items-center justify-center pl-4 rounded-l-full">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 bg-transparent border-none placeholder:text-slate-500 dark:placeholder:text-gray-500 px-3 focus:ring-0 text-sm font-normal rounded-r-full outline-none"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </label>
            <div className="flex gap-2">
              <Link
                href="/cart"
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-200 dark:bg-surface-dark border dark:border-white/10 hover:border-primary/50 transition-colors relative group"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-[80px] pb-12 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <nav className="flex text-sm text-slate-500 mb-2">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <span className="font-medium text-slate-900 dark:text-white">Shop All</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Basketballs</h1>
              <p className="mt-2 text-slate-500 dark:text-gray-400">Premium gear for indoor courts and outdoor streets.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 text-sm rounded-lg focus:ring-primary focus:border-primary block w-48 p-2.5 pr-8 outline-none"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="w-64 flex-shrink-0 space-y-8 hidden lg:block">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/10 font-bold"
              >
                <span>Filters</span>
                <span className="material-symbols-outlined">filter_list</span>
              </button>

              {/* Filter Content */}
              <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col gap-8`}>
                {/* Court Type Filter */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Court Type</h3>
                  <div className="space-y-3">
                    {courtTypes.map((type, index) => (
                      <button
                        key={index}
                        onClick={() => toggleCourtType(type.label)}
                        className="flex items-center gap-3 cursor-pointer group w-full text-left"
                      >
                        <div className={`size-5 rounded flex items-center justify-center border-2 transition-all ${selectedCourtTypes.includes(type.label)
                          ? 'bg-primary border-primary'
                          : 'border-slate-400 dark:border-slate-600'
                          }`}>
                          {selectedCourtTypes.includes(type.label) && (
                            <span className="material-symbols-outlined text-black text-sm">check</span>
                          )}
                        </div>
                        <span className={`text-sm transition-colors ${selectedCourtTypes.includes(type.label)
                          ? 'text-primary font-medium'
                          : 'text-slate-600 dark:text-slate-300 group-hover:text-primary'
                          }`}>
                          {type.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Size</h3>
                  <div className="space-y-3">
                    {sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => toggleSize(size.value)}
                        className="flex items-center gap-3 cursor-pointer group w-full text-left"
                      >
                        <div className={`size-5 rounded flex items-center justify-center border-2 transition-all ${selectedSizes.includes(size.value)
                          ? 'bg-primary border-primary'
                          : 'border-slate-400 dark:border-slate-600'
                          }`}>
                          {selectedSizes.includes(size.value) && (
                            <span className="material-symbols-outlined text-black text-sm">check</span>
                          )}
                        </div>
                        <span className={`text-sm transition-colors ${selectedSizes.includes(size.value)
                          ? 'text-primary font-medium'
                          : 'text-slate-600 dark:text-slate-300 group-hover:text-primary'
                          }`}>
                          {size.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="Min"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full bg-surface-dark border border-white/10 text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary pl-7 pr-3 py-2.5 outline-none text-white placeholder-slate-500"
                        />
                      </div>
                      <span className="text-slate-500 font-medium">—</span>
                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="Max"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full bg-surface-dark border border-white/10 text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary pl-7 pr-3 py-2.5 outline-none text-white placeholder-slate-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handlePriceApply}
                      className="w-full py-2.5 bg-primary hover:bg-primary-light text-black text-sm font-bold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Promo Banner */}
                <div className="rounded-2xl overflow-hidden relative aspect-[4/5] w-full mt-4 group cursor-pointer">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvVibDPRU8I7qPDZzmUiYOPYINxaNTGA5D24X1Q0PAAgsTZ_GFpSWz65S-nHCE9MkrEYyWY-L6O3WnbS5z4uiCPFsr0HmUDog646I87RzjjFiuRGJstJKouH0p5pkzC_mYqd1g-2Q495zh3BdVJbqTAMk8noOdx1MOGot5rnglFUSi249rSj-WnwAsKA4Ls4IlqbvnTz-cdKRdV5iUXre8vgcMBkRSXRbNK6Ar8P6GASSufD6jCCBH6N7aJohDllUnReH2ywasUg"
                    alt="Midnight Series Promo"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="text-primary font-bold text-xs uppercase tracking-wider mb-2 block">New Season</span>
                    <h4 className="text-white text-2xl font-black leading-none mb-2">Midnight Series</h4>
                    <p className="text-slate-300 text-sm mb-4">Limited edition night court basketballs.</p>
                    <span className="text-white text-sm font-bold underline underline-offset-4 decoration-primary decoration-2">Shop Now</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 rounded-2xl bg-white dark:bg-surface-dark p-4 shadow-sm hover:shadow-xl border border-slate-100 dark:border-white/5 group hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
                  >
                    <Link href={`/shop/product/${product.id}`} className="w-full aspect-square rounded-xl bg-slate-50 dark:bg-background-dark relative overflow-hidden block">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Dynamic Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {isNewProduct(product.createdAt) && (
                          <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wide uppercase">
                            NEW
                          </div>
                        )}
                        {getDiscountPercent(product) > 0 && (
                          <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wide uppercase">
                            Sale -{getDiscountPercent(product)}%
                          </div>
                        )}
                      </div>
                      <button className="absolute bottom-3 right-3 size-10 rounded-full bg-white dark:bg-surface-dark shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:text-primary border border-white/10">
                        <span className="material-symbols-outlined text-[20px]">favorite</span>
                      </button>
                    </Link>
                    <div className="flex flex-col gap-2 px-1">
                      <Link href={`/shop/product/${product.id}`}>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-gray-500">{product.category}</p>
                      </Link>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center gap-2">
                          {/* Price with discount styling */}
                          {getDiscountPercent(product) > 0 ? (
                            <>
                              <span className="text-sm line-through text-slate-400">${product.originalPrice?.toFixed(2)}</span>
                              <span className="text-xl font-bold text-red-500">${product.price.toFixed(2)}</span>
                              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                -{getDiscountPercent(product)}%
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-amber-400">
                          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="font-medium text-slate-500">({product.rating})</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className={`mt-3 w-full h-11 rounded-full text-sm font-bold transition-all flex items-center justify-center gap-2 ${addedItems.includes(product.id)
                          ? "bg-primary text-black"
                          : "bg-slate-900 dark:bg-white/5 hover:bg-primary dark:hover:bg-primary text-white hover:text-black dark:hover:text-black border dark:border-white/10"
                          }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {addedItems.includes(product.id) ? "check" : "add_shopping_cart"}
                        </span>
                        {addedItems.includes(product.id) ? "Eklendi!" : "Sepete Ekle"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`size-10 flex items-center justify-center rounded-lg border transition-colors ${currentPage === page
                          ? "bg-primary text-black font-bold border-primary"
                          : "border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-slate-200 dark:border-white/10 pt-16 pb-8 px-4 mt-auto">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary flex items-center justify-center text-black">
                  <span className="material-symbols-outlined">sports_basketball</span>
                </div>
                <h2 className="text-lg font-bold">Strive</h2>
              </div>
              <p className="text-slate-500 dark:text-gray-500 text-sm leading-relaxed">
                Crafting the world&apos;s finest basketball equipment for those who refuse to compromise on quality.
              </p>
            </div>
            <div className="flex flex-wrap gap-10 md:gap-20">
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-base">Shop</h3>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Basketballs</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Apparel</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Accessories</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Sale</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-base">Company</h3>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">About Us</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Careers</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Sustainability</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Contact</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-base">Support</h3>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Help Center</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Returns</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Size Guide</Link>
                <Link href="#" className="text-slate-500 dark:text-gray-500 text-sm hover:text-primary transition-colors">Warranty</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-100 dark:border-white/10 text-sm text-slate-400 dark:text-gray-600">
            <p>© 2024 Strive. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
