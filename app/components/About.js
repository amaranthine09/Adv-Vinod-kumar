"use client";
import { useEffect, useRef } from "react";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function About() {
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
      id="about"
      className="py-28 px-6 relative"
      style={{
        background: isLight ? "#ffffff" : "#000000",
        transition: "background 0.35s ease",
      }}
    >
      <div className="section-border-top" />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className={`text-[0.68rem] font-bold tracking-[4px] uppercase mb-4 font-[family-name:var(--font-inter)] ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.about.subtitle}
          </p>
          <h2 className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-tight ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.about.sectionTitle}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="header-line-left" />
            <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
            <div className="header-line-right" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.about.cards.map((c, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="reveal card-glow rounded-2xl p-9 relative overflow-hidden group border"
              style={{
                background: isLight ? "#ffffff" : "#0a0a0c",
                borderColor: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.08)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Icon Box */}
              <div
                className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-6 transition-all duration-350 border ${
                  isLight
                    ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
                    : "bg-white border-transparent text-black"
                }`}
              >
                <i className={`${c.icon} text-[1.3rem]`} />
              </div>

              <h3 className={`font-[family-name:var(--font-display)] text-[1.25rem] font-bold mb-4 ${
                isLight ? "text-black" : "text-white"
              }`}>
                {c.title}
              </h3>
              {c.body && (
                <p className={`text-[0.92rem] leading-[1.8] font-medium font-[family-name:var(--font-inter)] ${
                  isLight ? "text-[#333336]" : "text-gray-muted"
                }`}>
                  {c.body}
                </p>
              )}
              {c.items && (
                <ul className="flex flex-col gap-3">
                  {c.items.map((item, j) => (
                    <li key={j} className={`flex items-start gap-3 text-[0.9rem] font-medium font-[family-name:var(--font-inter)] ${
                      isLight ? "text-[#333336]" : "text-gray-muted"
                    }`}>
                      <i className={`fas fa-check-circle text-[0.85rem] flex-shrink-0 mt-0.5 ${
                        isLight ? "text-black" : "text-white"
                      }`} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
