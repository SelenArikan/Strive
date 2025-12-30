"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AboutPage() {
    const { totalItems } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="font-body bg-background-dark text-gray-100 antialiased selection:bg-primary selection:text-black min-h-screen">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-background-dark/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black">
                                <span className="material-symbols-outlined">sports_basketball</span>
                            </div>
                            <span className="font-body font-extrabold text-2xl tracking-tight text-white">Strive</span>
                        </div>
                        <div className="hidden md:flex space-x-12 items-center">
                            <Link href="/" className="text-base font-medium text-gray-300 hover:text-primary transition">Anasayfa</Link>
                            <Link href="/about" className="text-base font-medium text-white hover:text-primary transition">Hakkımızda</Link>
                            <Link href="/shop" className="text-base font-medium text-gray-300 hover:text-primary transition">Shop</Link>
                        </div>
                        <div className="flex items-center space-x-4 md:space-x-6">
                            <Link href="/cart" className="relative group cursor-pointer">
                                <div className="p-2 bg-surface-dark rounded-full border border-white/10 group-hover:border-primary/50 transition">
                                    <span className="material-symbols-outlined text-white">shopping_cart</span>
                                </div>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                                        {totalItems}
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
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Mobile Menu Panel */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-surface-dark z-[70] md:hidden transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <span className="text-lg font-bold text-white">Menü</span>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white transition">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="flex-1 py-6">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
                            <span className="material-symbols-outlined">home</span>
                            <span className="font-medium">Anasayfa</span>
                        </Link>
                        <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
                            <span className="material-symbols-outlined">storefront</span>
                            <span className="font-medium">Shop</span>
                        </Link>
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/5 hover:text-primary transition">
                            <span className="material-symbols-outlined">info</span>
                            <span className="font-medium">Hakkımızda</span>
                        </Link>
                        <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-gray-300 hover:bg-white/5 hover:text-primary transition">
                            <span className="material-symbols-outlined">shopping_cart</span>
                            <span className="font-medium">Sepet</span>
                            {totalItems > 0 && <span className="ml-auto px-2 py-1 bg-primary text-black text-xs font-bold rounded-full">{totalItems}</span>}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background-dark">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop')" }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background-dark/90 via-background-dark/80 to-background-dark"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-6xl lg:text-8xl font-body font-black text-white leading-none tracking-tight mb-6">
                        WHO WE <span className="text-primary">ARE</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Born on the court, built for the game. We are more than a brand; we are a movement dedicated to the purity of basketball.
                    </p>
                </div>
            </header>

            {/* Mission Section */}
            <section className="py-20 bg-surface-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtBUQvMJdBwekt4suQdxMvvWPWeLpnUymx_VM7QPL8VEnZR7MPC0axSV2NMPlXWNt0t3VH2hXkAd8hFdD51-WDcr3dMqzM968mG1fW-c-vI4olV9r88DLjn2sTEfsbODFKN9W2vPKujZQsH4c6OULCq1skh6PhdyYzDV2uiI9t6QC9lcjDqPnpqClHdb0kPnbfsFcCjouEcUB9rf9JLL4I0_EvdLLMsU0SVekieWzaUQiB6XTE3HIB0eD5EiAl5kNy92BoJ-P21eo"
                                    alt="Playing basketball at night"
                                    width={600}
                                    height={500}
                                    className="w-full h-[500px] object-cover hover:scale-105 transition duration-700 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md px-6 py-4 rounded-lg border-l-4 border-primary">
                                    <p className="text-white font-bold text-xl">The Pursuit of Greatness</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <h2 className="text-4xl font-body font-bold text-white mb-6">Our Mission</h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                    At Strive, our mission is simple: <span className="text-white font-bold">Empower every athlete to reach their full potential.</span> We believe that the right equipment can make the difference between a good player and a legend.
                                </p>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Every basketball we design is a testament to precision engineering, utilizing cutting-edge materials that enhance grip, durability, and aerodynamics. We don&apos;t just sell balls; we deliver the tools for your success on the hardwood and the asphalt.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-background-dark p-6 rounded-xl border border-white/5">
                                    <span className="material-symbols-outlined text-primary text-3xl mb-3 block">verified</span>
                                    <h3 className="text-white font-bold text-lg mb-1">Pro Certified</h3>
                                    <p className="text-gray-500 text-sm">Meeting rigorous league standards worldwide.</p>
                                </div>
                                <div className="bg-background-dark p-6 rounded-xl border border-white/5">
                                    <span className="material-symbols-outlined text-orange-500 text-3xl mb-3 block">science</span>
                                    <h3 className="text-white font-bold text-lg mb-1">Innovation</h3>
                                    <p className="text-gray-500 text-sm">Constant R&amp;D for better bounce and control.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-24 bg-background-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-body font-bold text-white tracking-tight">Core Values</h2>
                        <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Discipline */}
                        <div className="group relative bg-secondary p-8 rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300 border border-white/5">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full group-hover:bg-primary/10 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-surface-dark rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-2xl group-hover:text-black">fitness_center</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Discipline</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Success isn&apos;t accidental. It&apos;s the result of relentless practice and unwavering discipline. We build gear that keeps up with your grind.
                                </p>
                            </div>
                        </div>

                        {/* Community */}
                        <div className="group relative bg-secondary p-8 rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300 border border-white/5">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full group-hover:bg-orange-500/10 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-surface-dark rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300 shadow-lg">
                                    <span className="material-symbols-outlined text-orange-500 text-2xl group-hover:text-white">groups</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Community</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Basketball brings people together. From local pickup games to global tournaments, we support the community that makes the sport thrive.
                                </p>
                            </div>
                        </div>

                        {/* Excellence */}
                        <div className="group relative bg-secondary p-8 rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300 border border-white/5">
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full group-hover:bg-navy/30 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-surface-dark rounded-xl flex items-center justify-center mb-6 group-hover:bg-navy transition-colors duration-300 shadow-lg">
                                    <span className="material-symbols-outlined text-blue-400 text-2xl group-hover:text-white">star</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Excellence</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Good enough is not in our vocabulary. We strive for excellence in every stitch, every panel, and every bounce.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Journey Section */}
            <section className="py-24 bg-surface-dark relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-12">
                        <div className="md:w-3/5">
                            <div className="inline-flex items-center px-3 py-1 mb-6 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-wider">
                                Since 2010
                            </div>
                            <h2 className="text-4xl font-body font-bold text-white mb-6">Our Journey</h2>
                            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                                <p>
                                    Strive started in a small garage with a singular vision: to create a basketball that felt like an extension of the hand. Frustrated with slippery surfaces and inconsistent bounces in commercial balls, our founders—former collegiate players—decided to take matters into their own hands.
                                </p>
                                <p>
                                    After years of testing prototypes on asphalt courts in the summer heat and freezing gyms in the winter, the &quot;STRIVE Original&quot; was born. It wasn&apos;t just a product; it was a promise.
                                </p>
                                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-white text-xl">
                                    &quot;We didn&apos;t want to just make another basketball. We wanted to make the ball you fight over when practice starts.&quot;
                                </blockquote>
                                <p>
                                    Today, Strive is trusted by professional leagues and street legends alike. We&apos;ve grown, but our garage mentality remains: hustle hard, stay humble, and let the game speak.
                                </p>
                            </div>
                            <div className="mt-10">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBviU5TTe92gfFMeyfTNxkysQQWdkqD2NIwp5--Si9C9MAopiRlv1dLRMNlX_thz6y7NDn5Ila2yK234aeNGphb5eqFQyFC8YWa5Hal3Eavx-KRlo5FyvzxYX_q5HKqLTbOnuyqyPHkzjQ4j70Uym-Gzs8wBzWHhGL7SLPwuNFOdzPV2vWocAGwlyWomncOmvc0c9Kz2IpFdOKHLJAF7-Edm55MB-AxKSBOQZ7W4lZ5qojN6h3x_x5Q54vHggNppaz8rFS4luJv2-A"
                                    alt="Founder Signature"
                                    width={200}
                                    height={64}
                                    className="h-16 w-auto opacity-70 filter invert"
                                />
                            </div>
                        </div>
                        <div className="md:w-2/5 relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-green-600 rounded-2xl blur-lg opacity-30"></div>
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhPaPCLCKsoBg6HWZ6CmHO02-lN8qjz90wyYdP4TAFOy6BW6Z_p-_lD5jnwFtnTi35lUeLxZgZzSS5LENROhA-EhqdW3Y9wK4d7YWZX0dprSgOO0S6kiv1X9GO5ZnjbxYQVTQmzwlNolTEvxPWUlXB4TEx276Fr28n1pq7iC10voKXUXzUC6c3doiyya3tZB_n7Yoo5X_Zu6DuZG20ZOFSIsQkgIUTMYOfzYaEgmOHoT1fpkq5UPx2LF7XC471szwyqqQfq6fV-Kw"
                                alt="Team meeting on court"
                                width={500}
                                height={600}
                                className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover h-[600px] grayscale hover:grayscale-0 transition duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-primary relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
                ></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-black mb-12 uppercase tracking-tight">By The Numbers</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-black/5">
                            <p className="text-5xl font-display font-bold text-black mb-2">10+</p>
                            <p className="text-sm font-bold uppercase tracking-widest text-black/70">Years Experience</p>
                        </div>
                        <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-black/5">
                            <p className="text-5xl font-display font-bold text-black mb-2">50k+</p>
                            <p className="text-sm font-bold uppercase tracking-widest text-black/70">Balls Sold</p>
                        </div>
                        <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-black/5">
                            <p className="text-5xl font-display font-bold text-black mb-2">12</p>
                            <p className="text-sm font-bold uppercase tracking-widest text-black/70">Countries Served</p>
                        </div>
                        <div className="bg-black/10 backdrop-blur-sm p-6 rounded-xl border border-black/5">
                            <p className="text-5xl font-display font-bold text-black mb-2">100%</p>
                            <p className="text-sm font-bold uppercase tracking-widest text-black/70">Player Approved</p>
                        </div>
                    </div>
                    <Link
                        href="/shop"
                        className="inline-block px-10 py-4 bg-black text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-xl transform hover:-translate-y-1"
                    >
                        Join the Elite
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
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
                                <a href="#" className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center hover:bg-primary hover:text-black transition duration-300">
                                    <span className="font-display font-bold text-xs">IG</span>
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center hover:bg-primary hover:text-black transition duration-300">
                                    <span className="font-display font-bold text-xs">TW</span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-6">Shop</h4>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li><Link href="/shop" className="hover:text-primary transition">Basketballs</Link></li>
                                <li><Link href="#" className="hover:text-primary transition">Accessories</Link></li>
                                <li><Link href="#" className="hover:text-primary transition">Training Gear</Link></li>
                                <li><Link href="#" className="hover:text-primary transition">Apparel</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-6">Company</h4>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
                                <li><Link href="#" className="hover:text-primary transition">Careers</Link></li>
                                <li><Link href="#" className="hover:text-primary transition">Blog</Link></li>
                                <li><Link href="#" className="hover:text-primary transition">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-6">Stay Updated</h4>
                            <p className="text-gray-500 text-sm mb-4">Subscribe for the latest drops and exclusive offers.</p>
                            <form className="flex flex-col gap-2">
                                <input
                                    className="w-full px-4 py-3 rounded bg-surface-dark border border-white/10 focus:outline-none focus:border-primary text-white text-sm"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                <button className="w-full px-4 py-3 bg-white text-black font-bold uppercase text-xs tracking-wider rounded hover:bg-primary transition">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-sm">© 2024 Strive. All rights reserved.</p>
                        <div className="flex space-x-6 text-sm text-gray-600">
                            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
