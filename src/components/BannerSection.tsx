"use client";

import Image from "next/image";

export default function BannerSection() {
  return (
    <section className="py-10 px-4">
      <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden relative min-h-[400px] flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEvVibDPRU8I7qPDZzmUiYOPYINxaNTGA5D24X1Q0PAAgsTZ_GFpSWz65S-nHCE9MkrEYyWY-L6O3WnbS5z4uiCPFsr0HmUDog646I87RzjjFiuRGJstJKouH0p5pkzC_mYqd1g-2Q495zh3BdVJbqTAMk8noOdx1MOGot5rnglFUSi249rSj-WnwAsKA4Ls4IlqbvnTz-cdKRdV5iUXre8vgcMBkRSXRbNK6Ar8P6GASSufD6jCCBH6N7aJohDllUnReH2ywasUg"
            alt="Dark moody outdoor basketball court at night"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-background-dark/70"></div>
        <div className="relative z-10 p-8 max-w-[800px] flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-black text-[32px]">
              emoji_events
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Become a Legend
          </h2>
          <p className="text-xl text-gray-300">
            Join the thousands of athletes who trust Strive to take their
            game to the next level. Sign up today and get 20% off your first
            order.
          </p>
          <div className="flex flex-col sm:flex-row w-full max-w-md gap-3 mt-4">
            <input
              className="flex-grow h-12 rounded-full px-6 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none backdrop-blur-sm"
              placeholder="Enter your email"
              type="email"
            />
            <button className="h-12 px-8 rounded-full bg-primary text-black font-bold hover:bg-green-400 transition-colors whitespace-nowrap">
              Join Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
