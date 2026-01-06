"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch products and extract unique main categories
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products && Array.isArray(data.products)) {
          const uniqueMainCategories = Array.from(
            new Set(data.products.map((product: any) => product.mainCategory).filter(Boolean))
          ) as string[];
          setCategories(uniqueMainCategories);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const companyLinks = [
    { name: t("footer.about"), href: "/about" },
    { name: t("footer.contact"), href: "https://wa.me/905XXXXXXXXX?text=Merhaba, ürünleriniz hakkında bilgi almak istiyorum", isExternal: true },
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black">
                <span className="material-symbols-outlined text-sm">sports_basketball</span>
              </div>
              <span className="font-body font-bold text-xl tracking-wide">Strive</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {t("footer.brandDescription")}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center hover:bg-primary hover:text-black transition duration-300"
              >
                <span className="font-display font-bold text-xs">IG</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center hover:bg-primary hover:text-black transition duration-300"
              >
                <span className="font-display font-bold text-xs">TW</span>
              </a>
            </div>
          </div>

          {/* Shop Links - Dynamic Categories */}
          <div>
            <h4 className="font-bold text-white mb-6">{t("footer.shop")}</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/shop/catalog?mainCategory=${encodeURIComponent(category)}`}
                      className="hover:text-primary transition"
                    >
                      {category}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">{t("footer.loadingCategories")}</li>
              )}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-white mb-6">{t("footer.company")}</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {companyLinks.map((link: any) => (
                <li key={link.name}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="hover:text-primary transition">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2024 Strive. {t("footer.allRightsReserved")}.</p>
          <div className="flex space-x-6 text-sm text-gray-600">
            <Link href="/privacy-policy" className="hover:text-white transition">
              {t("footer.privacyPolicy")}
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition">
              {t("footer.termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
