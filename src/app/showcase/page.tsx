"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const showcaseItems = [
    {
        id: 1,
        title: "Pro Court Official",
        description: "The game-level ball trusted by professional leagues worldwide.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC66BYLRaktENaoaWrdiOe6R8Al8Qfsbq4WNv_2JeEnN0I5OxztSFEBxgh65kjlrO6eIA7tidmDAfmbZVT7wGAH3WW5jeAiCKr59AU-WKX8ImJQQJAnAxxxAt1gw93pwKXKpMmGhUaA8JaeHh1vB6XBd7VR63Rspn4ZjSsnR0Ab04Jc3YYyYfjDjHGQV8O-RJ0p6fdWtFKnu0geh6SnwOMTL_iSU3TvUOJdE0kbVXD0OjsDs2FD4eoL6Bc-kkHtEd8caoqLfk38pVc",
        category: "Indoor Series",
    },
    {
        id: 2,
        title: "Street Legend Grip",
        description: "Built for outdoor courts with superior durability and grip.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC7-00RthKCz5kPWOWRXaNS3tjPHHVqKQjK8KvTU_wyE2ky6zV3EHu2FQkQHx_fq_YXGjZ_QNxv2KvMuh8hHhF3Wie3fwn4xjjdsUFnuuwFFUTncvsUZba_26NbfXwgRu3dHA3dkixmoRxiSKzSLrkx8PQ8dezge64UyIm57zAoKOHO1Pv-jIvcSirNl8WS7asdpPCQYJeHjHRvrNtPVVuoVez_hNFp7Xokf_RGu0gswkXhdzyM3Mw8toEkHmTS-CjeE6K8JgEm00",
        category: "Outdoor Series",
    },
    {
        id: 3,
        title: "Elite Competition",
        description: "The perfect hybrid for all-surface domination.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8iTm1IE8m3GT30sqbTCI-RXFPGim2f2KWNs6NAsSdflToDCER_FenI6P2EKvdrbJgdiuYfRSd0BWBkj6bywza3hD4PPlkJHtcMpoDExcnZu9k__9vjrQdsSGctif1qpYLyHTPrL8e5lWoWiVno7P4s_mlkXBbQTcjEL8FnS5namCM9OPsJGSXJ2yEH6e56oXLZ1tlvg7e7-zuAiuQbymBScdyHFUfeyU-nnCqH_1N8SN7LSSra0sYvZxr2EyhcPKu0P9g3GdRUqs",
        category: "Hybrid Series",
    },
];

export default function ShowcasePage() {
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
                            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
                                Mağaza
                            </Link>
                            <Link href="/showcase" className="text-sm font-bold text-primary transition-colors">
                                Vitrin
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/cart"
                            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-200 dark:bg-surface-dark border dark:border-white/10 hover:border-primary/50 transition-colors relative group"
                        >
                            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
                                shopping_cart
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-[80px] pb-20 px-4 md:px-8">
                <div className="max-w-[1440px] mx-auto w-full">
                    {/* Page Header */}
                    <div className="text-center py-16">
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 uppercase tracking-wider">
                            Koleksiyon
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                            Vitrinimiz
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                            Her sahada mükemmelliği tanımlayan premium basketbol toplarını keşfedin.
                        </p>
                    </div>

                    {/* Showcase Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {showcaseItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-surface-dark shadow-xl hover:shadow-2xl border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="aspect-square relative overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-primary text-xs font-bold uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                    <h3 className="text-white text-2xl font-bold mt-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-300 mt-2 text-sm">
                                        {item.description}
                                    </p>
                                    <Link
                                        href="/shop"
                                        className="inline-flex items-center gap-2 mt-4 text-primary font-bold text-sm hover:gap-3 transition-all"
                                    >
                                        View Product
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </Link>
                                </div>
                                <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
                                    <span className="text-primary text-xs font-bold uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl font-bold mt-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 text-center">
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light text-black font-bold rounded-full transition-all hover:gap-3"
                        >
                            Tüm Ürünleri Görüntüle
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
