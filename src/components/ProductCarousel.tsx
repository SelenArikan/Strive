"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/hooks/useLanguage";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeColor?: string;
  image: string;
}

export default function ProductCarousel() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });

    // Show added feedback
    setAddedItems((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedItems((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#08100d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-body font-bold text-white uppercase tracking-tight">
            STRIVE
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 border border-white/10 rounded-full hover:bg-white/10 text-white transition"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 border border-white/10 rounded-full hover:bg-white/10 text-white transition"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Image Container */}
              <Link href={`/shop/product/${product.id}`} className="relative bg-surface-dark rounded-2xl p-6 mb-4 overflow-hidden h-80 flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition block">
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded z-10">
                    {product.badge}
                  </span>
                )}

                {/* Favorite Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button onClick={(e) => e.preventDefault()} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-gray-400 hover:text-primary transition">
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </button>
                </div>

                {/* Product Image */}
                <div className="relative w-48 h-48 group-hover:scale-110 transition duration-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <Link href={`/shop/product/${product.id}`}>
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{product.category}</p>
              </Link>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">
                    ₺{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ₺{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`text-xs uppercase font-bold transition ${addedItems.includes(product.id)
                    ? "text-white"
                    : "text-primary hover:text-white"
                    }`}
                >
                  {addedItems.includes(product.id) ? t('common.added') : t('common.addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
