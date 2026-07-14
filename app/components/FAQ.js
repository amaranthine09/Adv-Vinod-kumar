"use client";
import { useState, useEffect, useRef } from "react";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="faq"
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

      <div className="max-w-[820px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className={`text-[0.68rem] font-bold tracking-[4px] uppercase mb-4 font-[family-name:var(--font-inter)] ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.faq.subtitle}
          </p>
          <h2 className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-tight ${
            isLight ? "text-black" : "text-white"
          }`}>
            {data.ui.sections.faq.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="header-line-left" />
            <div className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
            <div className="header-line-right" />
          </div>
        </div>

        {/* Accordion */}
        <div ref={sectionRef} className="reveal flex flex-col gap-3">
          {data.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  background: isLight ? "#ffffff" : "#000000",
                  borderColor: isOpen
                    ? (isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.18)")
                    : (isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)"),
                  boxShadow: isOpen
                    ? (isLight ? "0 4px 16px rgba(0,0,0,0.06)" : "0 4px 16px rgba(0,0,0,0.3)")
                    : "none",
                }}
              >
                {/* Question button */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[0.82rem] border transition-all duration-300 ${
                        isOpen
                          ? (isLight ? "bg-black text-white border-black" : "bg-white text-black border-white")
                          : (isLight ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]" : "bg-[#0a0a0c] border-[rgba(255,255,255,0.12)] text-white")
                      }`}
                    >
                      <i className="fas fa-question" />
                    </div>
                    <span className={`font-[family-name:var(--font-display)] text-[1rem] font-bold ${
                      isLight ? "text-black" : "text-white"
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <i
                    className={`fas ${isOpen ? "fa-minus" : "fa-plus"} text-[0.8rem] flex-shrink-0 transition-transform duration-300 ${
                      isLight ? "text-[#555558]" : "text-gray-muted"
                    }`}
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {/* Answer panel */}
                <div
                  className="faq-answer-panel"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                  }}
                >
                  <div className="px-7 pb-6 pt-0">
                    <div
                      className="h-px mb-5"
                      style={{ background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)" }}
                    />
                    <p className={`text-[0.92rem] leading-[1.85] font-medium font-[family-name:var(--font-inter)] ${
                      isLight ? "text-[#333336]" : "text-gray-muted"
                    }`}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
