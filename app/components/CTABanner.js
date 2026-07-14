"use client";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function CTABanner() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cta = data.ctaBanner;
  const p = data.personal;

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background: isLight ? "#f5f5f7" : "#0a0a0c",
        transition: "background 0.35s ease",
      }}
    >
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-[820px] mx-auto text-center relative z-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-[1.5rem] border ${
              isLight
                ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
                : "bg-white border-transparent text-black"
            }`}
          >
            <i className="fas fa-scale-balanced" />
          </div>
        </div>

        <h2
          className={`font-[family-name:var(--font-display)] text-[clamp(1.85rem,4vw,2.8rem)] font-extrabold mb-4 ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          {cta.heading}
        </h2>
        <p
          className={`text-[1.05rem] leading-[1.8] font-medium font-[family-name:var(--font-inter)] mb-8 max-w-[600px] mx-auto ${
            isLight ? "text-[#333336]" : "text-gray-muted"
          }`}
        >
          {cta.subheading}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-[0.95rem] font-[family-name:var(--font-inter)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: isLight ? "#000000" : "#ffffff",
              color: isLight ? "#ffffff" : "#000000",
            }}
          >
            <i className="fas fa-paper-plane text-[0.82rem]" />
            {cta.buttonText}
          </a>

          <div className="flex items-center gap-2">
            <span
              className={`text-[0.85rem] font-semibold font-[family-name:var(--font-inter)] ${
                isLight ? "text-[#555558]" : "text-gray-muted"
              }`}
            >
              {cta.phoneText}
            </span>
            <a
              href={p.phoneHref}
              className={`text-[0.95rem] font-bold font-[family-name:var(--font-inter)] hover:underline transition-colors ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {p.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
