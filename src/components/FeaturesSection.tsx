"use client";

import Link from "next/link";
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
