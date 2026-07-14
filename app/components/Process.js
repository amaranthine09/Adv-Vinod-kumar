"use client";
import { useEffect, useRef } from "react";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function Process() {
  const stepsRef = useRef([]);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    stepsRef.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const steps = data.process;

  return (
    <section
      id="process"
      className="py-28 px-6 relative"
      style={{
        background: isLight ? "#ffffff" : "#000000",
        transition: "background 0.35s ease",
      }}
    >
      <div className="section-border-top" />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className={`text-[0.68rem] font-bold tracking-[4px] uppercase mb-4 font-[family-name:var(--font-inter)] ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.process.subtitle}
          </p>
          <h2 className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-tight ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.process.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="header-line-left" />
            <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
            <div className="header-line-right" />
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop only) */}
          <div
            className="process-connector hidden lg:block absolute top-[3.5rem] left-[12%] right-[12%] h-px z-0"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, ${
                isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"
              } 0, ${
                isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"
              } 8px, transparent 8px, transparent 16px)`,
            }}
          />

          {steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="reveal relative z-10 flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Step number badge */}
              <div className="relative mb-6">
                <div
                  className={`w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center text-[1.6rem] border-2 transition-all duration-300 ${
                    isLight
                      ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
                      : "bg-[#0a0a0c] border-[rgba(255,255,255,0.15)] text-white"
                  }`}
                  style={{
                    boxShadow: isLight
                      ? "0 4px 20px rgba(0,0,0,0.06)"
                      : "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                >
                  <i className={s.icon} />
                </div>
                {/* Step number pill */}
                <span
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-[0.75rem] font-extrabold font-[family-name:var(--font-inter)]"
                  style={{
                    background: isLight ? "#000000" : "#ffffff",
                    color: isLight ? "#ffffff" : "#000000",
                    boxShadow: isLight
                      ? "0 2px 8px rgba(0,0,0,0.15)"
                      : "0 2px 8px rgba(0,0,0,0.6)",
                  }}
                >
                  {s.step}
                </span>
              </div>

              <h3 className={`font-[family-name:var(--font-display)] text-[1.08rem] font-bold mb-3 ${
                isLight ? "text-black" : "text-white"
              }`}>
                {s.title}
              </h3>
              <p className={`text-[0.88rem] leading-[1.75] font-[family-name:var(--font-inter)] max-w-[260px] ${
                isLight ? "text-[#333336]" : "text-gray-muted"
              }`}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
