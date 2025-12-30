"use client";

import Link from "next/link";

const features = [
  {
    icon: "bolt",
    title: "Superior Grip",
    description:
      "Proprietary micro-pebble texture ensures maximum control in sweat-heavy conditions.",
  },
  {
    icon: "sports_handball",
    title: "Consistent Bounce",
    description:
      "Reinforced nylon windings ensure structural integrity and a perfect bounce, game after game.",
  },
  {
    icon: "wb_sunny",
    title: "All-Weather Ready",
    description:
      "Designed for both indoor hardwood and rough outdoor concrete courts without compromising feel.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-background-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-body font-bold text-white mb-6 tracking-tight">
              Why Choose Our Gear?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Engineered for performance, durability, and the perfect feel in
              every dribble. We don&apos;t just make basketballs; we craft tools for your success.
            </p>
          </div>
          <Link
            href="#"
            className="hidden md:flex items-center text-primary font-bold hover:text-white transition group"
          >
            See technology
            <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            href="#"
            className="flex items-center text-primary font-bold hover:text-white transition group"
          >
            See technology
            <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
