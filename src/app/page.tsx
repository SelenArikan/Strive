"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductCarousel from "@/components/ProductCarousel";
import BannerSection from "@/components/BannerSection";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setShowIntro(false);
    setContentVisible(true);
  }, []);

  return (
    <>
      {showIntro && <IntroAnimation onAnimationComplete={handleAnimationComplete} />}

      <div
        className={`relative flex min-h-screen w-full flex-col transition-opacity duration-1000 ${contentVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <ProductCarousel />
          <BannerSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
