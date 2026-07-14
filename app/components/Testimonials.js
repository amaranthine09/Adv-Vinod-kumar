"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const items = data.testimonials;
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cfg = data.reviewConfig;

  const [userReviews, setUserReviews] = useState([]);

  // Fetch user-submitted reviews
  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setUserReviews(d); })
      .catch(() => {});
  }, []);

  const next = useCallback(() => setCurrent((c) => (userReviews.length > 0 ? (c + 1) % userReviews.length : 0)), [userReviews.length]);
  const prev = useCallback(() => setCurrent((c) => (userReviews.length > 0 ? (c - 1 + userReviews.length) % userReviews.length : 0)), [userReviews.length]);

  useEffect(() => {
    if (userReviews.length <= 1) return;
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
        {userReviews.length > 0 ? (
          <>
            <div
              className="overflow-hidden rounded-3xl mb-8"
              style={{ border: `1px solid ${isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)"}` }}
            >
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {userReviews.map((t, i) => (
                  <div
                    key={i}
                    className="min-w-full p-10 md:p-14 relative"
                    style={{
                      background: isLight ? "#ffffff" : "#000000",
                      transition: "background 0.35s ease",
                    }}
                  >
                    {/* Quote Icon */}
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
                        {t.location && (
                          <span className={`text-[0.8rem] font-[family-name:var(--font-inter)] font-semibold ${
                            isLight ? "text-[#555558]" : "text-gray-muted"
                          }`}>
                            {t.location}
                          </span>
                        )}
                      </div>
                      {/* Star Rating */}
                      <div className="ml-auto hidden sm:flex gap-0.5">
                        {[...Array(5)].map((_, k) => (
                          <i key={k} className={`fas fa-star text-[0.72rem] ${
                            k < (t.rating || 5) ? (isLight ? "text-black" : "text-white") : (isLight ? "text-black/15" : "text-white/15")
                          }`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            {userReviews.length > 1 && (
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
                  {userReviews.map((_, i) => (
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
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className={`text-[1.1rem] italic font-medium font-[family-name:var(--font-inter)] ${
              isLight ? "text-black/50" : "text-white/50"
            }`}>
              {cfg.noApiMessage}
            </p>
          </div>
        )}



        {/* "Share Your Experience" button */}
        <div className="text-center mt-12">
          <Link
            href="/review"
            id="share-experience-btn"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-[0.92rem] font-[family-name:var(--font-inter)] border transition-all duration-300 hover:-translate-y-1 ${
              isLight
                ? "bg-black text-white border-black hover:bg-white hover:text-black"
                : "bg-white text-black border-white hover:bg-black hover:text-white hover:border-white/30"
            }`}
          >
            <i className="fas fa-star text-[0.82rem]" />
            {cfg.giveOpinionButton}
            <i className="fas fa-arrow-right text-[0.72rem]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
