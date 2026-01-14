"use client";

import Link from "next/link";
import Image from "next/image";
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
    { name: t("footer.contact"), href: "https://wa.me/905547970558", isExternal: true },
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="mb-6">
              <Image
                src="/Logos/logo(beyaz).png"
                alt="Strive"
                width={120}
                height={42}
                className="h-10 w-auto"
              />
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
                href="https://wa.me/905547970558"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center hover:bg-green-500 hover:text-white transition duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
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
