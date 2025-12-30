"use client";

import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background-dark min-h-screen">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/basketball-hero.mp4" type="video/mp4" />
                </video>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark/95 via-background-dark/70 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] z-[1]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Left Content */}
                <div className="lg:w-1/2 flex flex-col items-start text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-1.5 mb-8 bg-surface-dark border border-primary/30 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        <span className="text-primary font-bold tracking-wide text-xs uppercase">New Season Drop</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-6xl lg:text-8xl font-body font-black text-white leading-[0.95] tracking-tight mb-6">
                        Strive for <br />
                        <span className="text-primary">Success</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-gray-400 mb-10 max-w-lg font-light leading-relaxed">
                        Elevate your game with our premium pro-series basketballs. Precision engineered for the dedicated athlete.
                    </p>

                    {/* Button - Only Shop Collection */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
                        <Link
                            href="/shop/catalog"
                            className="px-8 py-4 bg-primary hover:bg-primary-light text-black font-bold text-lg rounded-full transition transform hover:-translate-y-1 shadow-[0_0_20px_rgba(232,106,51,0.3)] text-center"
                        >
                            Shop Collection
                        </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-gray-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-gray-700 flex items-center justify-center text-white text-xs font-bold">MK</div>
                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-gray-500 flex items-center justify-center text-white text-xs font-bold">LB</div>
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">1000+ Ballers</p>
                            <p className="text-primary text-xs">Trust our gear</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
