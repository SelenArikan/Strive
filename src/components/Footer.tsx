"use client";

import Link from "next/link";
import { useState } from "react";

const footerLinks = {
  shop: [
    { name: "Basketballs", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Training Gear", href: "#" },
    { name: "Apparel", href: "#" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black">
                <span className="material-symbols-outlined text-sm">sports_basketball</span>
              </div>
              <span className="font-body font-bold text-xl tracking-wide">Strive</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Professional grade equipment for the modern athlete. Designed for durability, performance, and style.
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

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">
              Subscribe for the latest drops and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded bg-surface-dark border border-white/10 focus:outline-none focus:border-primary text-white text-sm"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-white text-black font-bold uppercase text-xs tracking-wider rounded hover:bg-primary transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2024 Strive. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-600">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
