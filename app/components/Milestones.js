"use client";
import { useEffect, useRef } from "react";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function Milestones() {
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

  const cardStyle = {
    background: isLight ? "#ffffff" : "#0a0a0c",
    border: `1px solid ${isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.08)"}`,
    transition: "background 0.35s ease, border-color 0.35s ease",
  };

  const nodeRing = isLight
    ? "0 0 0 5px #ffffff, 0 0 0 6px rgba(0,0,0,0.1)"
    : "0 0 0 6px #000000, 0 0 0 8px rgba(255,255,255,0.12), 0 0 18px rgba(255,255,255,0.15)";

  return (
    <section
      id="milestones"
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
            {data.ui.sections.milestones.subtitle}
          </p>
          <h2 className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-tight ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.milestones.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="header-line-left" />
            <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
            <div className="header-line-right" />
          </div>
        </div>

        <div className="relative">
          <div className="timeline-line" />
          <div className="flex flex-col gap-14">
            {data.milestones.map((m, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="reveal relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6"
              >
                {m.side === "left" ? (
                  <div className="card-glow rounded-2xl p-7 text-right" style={cardStyle}>
                    <span className={`font-[family-name:var(--font-inter)] text-[0.68rem] tracking-[3px] font-bold uppercase ${
                      isLight ? "text-black" : "text-white"
                    }`}>
                      {m.year}
                    </span>
                    <h3 className={`font-[family-name:var(--font-display)] text-[1.15rem] font-bold mt-2 mb-2 ${
                      isLight ? "text-black" : "text-white"
                    }`}>
                      {m.title}
                    </h3>
                    <p className={`text-[0.9rem] leading-[1.8] font-[family-name:var(--font-inter)] ${
                      isLight ? "text-[#333336]" : "text-gray-muted"
                    }`}>
                      {m.desc}
                    </p>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}

                {/* Node icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-[1rem] z-10 flex-shrink-0 mx-auto border ${
                    isLight
                      ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
                      : "bg-white border-transparent text-black"
                  }`}
                  style={{ boxShadow: nodeRing }}
                >
                  <i className={m.icon} />
                </div>

                {m.side === "right" ? (
                  <div className="card-glow rounded-2xl p-7" style={cardStyle}>
                    <span className={`font-[family-name:var(--font-inter)] text-[0.68rem] tracking-[3px] font-bold uppercase ${
                      isLight ? "text-black" : "text-white"
                    }`}>
                      {m.year}
                    </span>
                    <h3 className={`font-[family-name:var(--font-display)] text-[1.15rem] font-bold mt-2 mb-2 ${
                      isLight ? "text-black" : "text-white"
                    }`}>
                      {m.title}
                    </h3>
                    <p className={`text-[0.9rem] leading-[1.8] font-[family-name:var(--font-inter)] ${
                      isLight ? "text-[#333336]" : "text-gray-muted"
                    }`}>
                      {m.desc}
                    </p>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
