"use client";
import { useState, useEffect, useCallback } from "react";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const items = data.testimonials;
  const { theme } = useTheme();
  const isLight = theme === "light";

  const next = useCallback(() => setCurrent((c) => (c + 1) % items.length), [items.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section
      id="testimonials"
      className="py-28 px-6 relative"
      style={{
        background: isLight ? "#f5f5f7" : "#0a0a0c",
        transition: "background 0.35s ease",
      }}
    >
      <div className="section-border-top" />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)" }}
      />

      <div className="max-w-[860px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className={`text-[0.68rem] font-bold tracking-[4px] uppercase mb-4 font-[family-name:var(--font-inter)] ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.testimonials.subtitle}
          </p>
          <h2 className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-tight ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.testimonials.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="header-line-left" />
            <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
            <div className="header-line-right" />
          </div>
        </div>

        {/* Slider */}
        <div
          className="overflow-hidden rounded-3xl mb-8"
          style={{ border: `1px solid ${isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)"}` }}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {items.map((t, i) => (
              <div
                key={i}
                className="min-w-full p-10 md:p-14 relative"
                style={{
                  background: isLight ? "#ffffff" : "#000000",
                  transition: "background 0.35s ease",
                }}
              >
                {/* Quote Icon (NO gold, clean black/white) */}
                <i className={`fas fa-quote-left text-[3rem] opacity-10 mb-6 block ${
                  isLight ? "text-black" : "text-white"
                }`} />

                <p className={`text-[1.08rem] leading-[1.85] italic mb-8 font-medium font-[family-name:var(--font-inter)] ${
                  isLight ? "text-[#1d1d1f]" : "text-off-white"
                }`}>
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[1.1rem] flex-shrink-0 border ${
                    isLight
                      ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
                      : "bg-white border-transparent text-black"
                  }`}>
                    <i className="fas fa-user" />
                  </div>
                  <div>
                    <strong className={`block text-[0.98rem] font-bold font-[family-name:var(--font-display)] ${
                      isLight ? "text-black" : "text-white"
                    }`}>
                      {t.name}
                    </strong>
                    <span className={`text-[0.8rem] font-[family-name:var(--font-inter)] font-semibold ${
                      isLight ? "text-[#555558]" : "text-gray-muted"
                    }`}>
                      {t.place}
                    </span>
                  </div>
                  {/* Star Rating (Silver stars instead of gold stars) */}
                  <div className="ml-auto hidden sm:flex gap-0.5">
                    {[...Array(5)].map((_, k) => (
                      <i key={k} className={`fas fa-star text-[0.72rem] ${
                        isLight ? "text-black" : "text-white"
                      }`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls (NO gold, clean black/white border circles) */}
        <div className="flex items-center justify-center gap-4">
          <button
            id="testimonial-prev"
            onClick={prev}
            className={`w-10 h-10 rounded-full text-sm transition-all cursor-pointer border flex items-center justify-center ${
              isLight
                ? "bg-white border-black/15 text-black hover:bg-black hover:text-white"
                : "bg-black border-white/15 text-white hover:bg-white hover:text-black"
            }`}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <div className="flex gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all cursor-pointer"
                style={{
                  width: i === current ? "24px" : "8px",
                  background: i === current ? (isLight ? "#000000" : "#ffffff") : (isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)"),
                }}
              />
            ))}
          </div>
          <button
            id="testimonial-next"
            onClick={next}
            className={`w-10 h-10 rounded-full text-sm transition-all cursor-pointer border flex items-center justify-center ${
              isLight
                ? "bg-white border-black/15 text-black hover:bg-black hover:text-white"
                : "bg-black border-white/15 text-white hover:bg-white hover:text-black"
            }`}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
