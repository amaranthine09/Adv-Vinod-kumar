"use client";
import { useEffect, useRef } from "react";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function WhyChoose() {
  const cardsRef = useRef([]);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="why-choose"
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

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className={`text-[0.68rem] font-bold tracking-[4px] uppercase mb-4 font-[family-name:var(--font-inter)] ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.whyChoose.subtitle}
          </p>
          <h2 className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-tight ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.whyChoose.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="header-line-left" />
            <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
            <div className="header-line-right" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.whyChooseMe.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="reveal card-glow rounded-2xl p-9 relative overflow-hidden group border"
              style={{
                background: isLight ? "#ffffff" : "#000000",
                borderColor: isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)",
                transitionDelay: `${i * 70}ms`,
              }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[1.35rem] mb-7 transition-all duration-350 group-hover:scale-110 border ${
                  isLight
                    ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
                    : "bg-white border-transparent text-black"
                }`}
              >
                <i className={item.icon} />
              </div>

              <h3 className={`font-[family-name:var(--font-display)] text-[1.12rem] font-bold mb-3 ${
                isLight ? "text-black" : "text-white"
              }`}>
                {item.title}
              </h3>
              <p className={`text-[0.9rem] leading-[1.8] font-[family-name:var(--font-inter)] ${
                isLight ? "text-[#333336]" : "text-gray-muted"
              }`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
