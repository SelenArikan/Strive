"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: "volume_off",
      title: t('features.cards.silent.title'),
      description: t('features.cards.silent.desc'),
    },
    {
      icon: "sports_basketball",
      title: t('features.cards.balanced.title'),
      description: t('features.cards.balanced.desc'),
    },
    {
      icon: "child_care",
      title: t('features.cards.child.title'),
      description: t('features.cards.child.desc'),
    },
    {
      icon: "emoji_emotions",
      title: t('features.cards.fun.title'),
      description: t('features.cards.fun.desc'),
    },
  ];

  return (
    <section className="py-24 bg-background-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-body font-bold text-white mb-6 tracking-tight">
              {t('features.title')}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t('features.description')}
              {" "}
              {t('features.descriptionHighlight')}
              <span className="text-white font-bold">{t('features.descriptionHighlightBold')}</span>
            </p>
          </div>
          <Link
            href="/shop/catalog"
            className="hidden md:flex items-center text-primary font-bold hover:text-white transition group"
          >
            {t('features.discover')}
            <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface-dark p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition duration-300 group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-black transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-black">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certificates Section */}
        <div className="mt-20 pt-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-white mb-2 text-center md:text-left">{t('about.certifiedQuality')}</h3>
              <p className="text-gray-400 text-sm text-center md:text-left">{t('about.certifiedQualityDesc')}</p>
            </div>

            <div
              className="flex gap-4 overflow-x-auto pb-4 md:pb-0 justify-center md:justify-end w-full md:w-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >

              {/* Certificate 1: REACH PAHs */}
              <a
                href="/Certification/TCT251117C004001-Etiket-STRIVE Silent Basketball-REACH 附录 17 PAHs 8 英文(1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-white/20 hover:border-primary hover:scale-105 transition-all duration-300 shadow-lg bg-white relative group"
                title="REACH PAHs Certification"
              >
                <Image
                  src="/Certification/thumbnails/cert1-reach-pahs.png"
                  alt="REACH PAHs"
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </a>
              {/* Certificate 2: EN 71 */}
              <a
                href="/Certification/TCT251117C004002-Etiket-STRIVE Silent Basketball-Size 7，Size 5-EN 71-1-2-3 (2024) 英文.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-white/20 hover:border-primary hover:scale-105 transition-all duration-300 shadow-lg bg-white relative group"
                title="EN 71 Certification"
              >
                <Image
                  src="/Certification/thumbnails/cert2-en71.png"
                  alt="EN 71"
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </a>
              {/* Certificate 3: REACH Phthalates */}
              <a
                href="/Certification/TCT251117C004003-Etiket-STRIVE Silent Basketball-REACH 附录17 邻苯 英文(1).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-white/20 hover:border-primary hover:scale-105 transition-all duration-300 shadow-lg bg-white relative group"
                title="REACH Phthalates Certification"
              >
                <Image
                  src="/Certification/thumbnails/cert3-reach-phthalates.png"
                  alt="REACH Phthalates"
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </a>
              {/* Certificate 4: CE */}
              <a
                href="/Certification/TCT251117C004002 CE 证书.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-white/20 hover:border-primary hover:scale-105 transition-all duration-300 shadow-lg bg-white relative group"
                title="CE Certification"
              >
                <Image
                  src="/Certification/thumbnails/cert4-ce.png"
                  alt="CE"
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile "See technology" link */}
        <div className="mt-8 md:hidden">
          <Link
            href="/shop/catalog"
            className="flex items-center text-primary font-bold hover:text-white transition group"
          >
            {t('features.discover')}
            <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
