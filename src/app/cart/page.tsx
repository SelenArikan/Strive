"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, subtotal } = useCart();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-gray-100">
      {/* Header */}
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-20">
        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Your Cart</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            {totalItems > 0
              ? `You have ${totalItems} item${totalItems > 1 ? "s" : ""} in your cart ready for checkout.`
              : "Your cart is empty."}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-20">
            <div className="size-24 mx-auto mb-6 bg-gray-100 dark:bg-surface-dark rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-gray-400">shopping_cart</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any items yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-black font-bold rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined">storefront</span>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Cart Items */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size || 'default'}`}
                  className="bg-white dark:bg-surface-dark rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col sm:flex-row gap-6 transition-transform hover:shadow-md"
                >
                  {/* Image */}
                  <div className="shrink-0 w-full sm:w-32 h-32 bg-gray-100 dark:bg-background-dark rounded-xl overflow-hidden flex items-center justify-center relative group">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold leading-tight mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.category}
                          {item.size && <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">Size {item.size}</span>}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                        {item.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">${item.originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-6">
                        {/* Quantity */}
                        <div className="flex items-center bg-slate-100 dark:bg-background-dark rounded-lg border border-gray-200 dark:border-white/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-l-lg transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1, item.size)}
                            className="w-10 h-8 bg-transparent border-none text-center text-sm font-semibold focus:ring-0 p-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5 rounded-r-lg transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-400">Total</span>
                        <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <div className="mt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-white/5">
                  <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Shipping estimate</span>
                      <span className="font-semibold text-primary text-sm">Free</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Tax estimate</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>

                    {/* Discount Code Input */}
                    <div className="pt-2">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">
                        Gift Card / Promo Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          className="flex-1 bg-slate-100 dark:bg-background-dark border border-gray-200 dark:border-white/10 rounded-lg text-sm px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-shadow"
                          placeholder="Code"
                          type="text"
                        />
                        <button className="px-4 py-2 bg-gray-200 dark:bg-white/10 text-sm font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="my-6 border-t border-dashed border-gray-200 dark:border-white/10"></div>

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-lg font-bold">Order Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-black tracking-tight">${total.toFixed(2)}</span>
                      <p className="text-xs text-gray-400 mt-1">USD</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={async () => {
                      // 1. Track Purchase Event
                      try {
                        await fetch("/api/analytics", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ type: "purchase" }),
                        });
                      } catch (err) {
                        console.error("Analytics error:", err);
                      }

                      // 2. Prepare WhatsApp Message
                      const phoneNumber = "905555555555"; // BURAYI KENDİ NUMARANIZLA DEĞİŞTİRİN

                      let message = `*Yeni Sipariş!* 🏀\n\n`;
                      items.forEach((item, index) => {
                        message += `${index + 1}. ${item.name} (${item.category})\n`;
                        message += `   Size: ${item.size || "Std"} | Adet: ${item.quantity}\n`;
                        message += `   Fiyat: $${item.price.toFixed(2)}\n\n`;
                      });

                      message += `*Toplam Tutar: $${total.toFixed(2)}* (Vergi dahil)\n\n`;
                      message += `Siparişimi onaylamak istiyorum.`;

                      // 3. Redirect to WhatsApp
                      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group"
                  >
                    <span>WhatsApp ile Satın Al</span>
                    <span className="text-2xl" style={{ fontFamily: "Arial" }}>💬</span>
                  </button>

                  <div className="mt-6 flex justify-center gap-4 opacity-50 grayscale">
                    <span className="material-symbols-outlined text-3xl" title="Credit Card">credit_card</span>
                    <span className="material-symbols-outlined text-3xl" title="Secure Payment">lock</span>
                    <span className="material-symbols-outlined text-3xl" title="Wallet">account_balance_wallet</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>Secure Checkout with 256-bit SSL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
