"use client";
import { useState, useEffect } from "react";
import data from "../data/siteData.json";
import { useTheme } from "../providers/ThemeProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "about", "practice", "milestones", "testimonials", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Home",         href: "#home" },
    { name: "About",        href: "#about" },
    { name: "Practice",     href: "#practice" },
    { name: "Milestones",   href: "#milestones" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact",      href: "#contact" },
  ];

  const navBg = scrolled
    ? isLight
      ? "bg-white/95 backdrop-blur-2xl border-b border-black/[0.08] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
      : "bg-black/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_40px_rgba(0,0,0,0.8)]"
    : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-400 ${scrolled ? "py-2" : "py-5"}`}>
      <div className={`absolute inset-0 transition-all duration-400 ${navBg}`} />

      <div className="relative z-10 max-w-[1340px] mx-auto flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <a href="#home" id="nav-logo" className="flex items-center gap-3 group">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${
            isLight
              ? "bg-[#f2f2f7] border-[#d2d2d7] text-[#1d1d1f]"
              : "bg-white border-transparent text-black"
          }`}>
            <i className={`fas fa-balance-scale text-[0.85rem]`} />
          </div>
          <div className="flex flex-col">
            <span className={`font-[family-name:var(--font-display)] font-extrabold text-[0.9rem] leading-tight tracking-wide ${isLight ? "text-black" : "text-white"}`}>
              {data.personal.name.toUpperCase()}
            </span>
            <span className={`text-[0.58rem] tracking-[2.5px] uppercase font-medium font-[family-name:var(--font-inter)] ${isLight ? "text-[#555558]" : "text-gray-muted"}`}>
              {data.personal.court} · {data.personal.location}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => {
            const active = activeSection === l.href.slice(1);
            return (
              <a
                key={l.name}
                href={l.href}
                className={`relative px-4 py-2 text-[0.82rem] font-semibold rounded-lg transition-all duration-300 font-[family-name:var(--font-inter)] ${
                  active
                    ? isLight
                      ? "text-black bg-black/[0.04]"
                      : "text-white bg-white/[0.06]"
                    : isLight
                      ? "text-[#444446] hover:text-black hover:bg-black/[0.02]"
                      : "text-gray-muted hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {l.name}
                {active && (
                  <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[1.5px] rounded-full ${isLight ? "bg-black" : "bg-white"}`} />
                )}
              </a>
            );
          })}

          {/* Theme toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="theme-toggle ml-2"
            aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            style={{ color: isLight ? "#1d1d1f" : "#ffffff" }}
          >
            <i className={`fas ${isLight ? "fa-moon" : "fa-sun"} text-[0.78rem]`} style={{ color: isLight ? "#1d1d1f" : "#ffffff" }} />
            <span className="text-[0.72rem] font-bold font-[family-name:var(--font-inter)] ml-1.5 tracking-wide" style={{ color: isLight ? "#1d1d1f" : "#ffffff" }}>
              {isLight ? data.ui.buttons.themeDark : data.ui.buttons.themeLight}
            </span>
          </button>
        </div>

        {/* Mobile Right */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme" style={{ color: isLight ? "#1d1d1f" : "#ffffff" }}>
            <i className={`fas ${isLight ? "fa-moon" : "fa-sun"} text-[0.78rem]`} style={{ color: isLight ? "#1d1d1f" : "#ffffff" }} />
            <span className="text-[0.7rem] font-bold font-[family-name:var(--font-inter)] ml-1" style={{ color: isLight ? "#1d1d1f" : "#ffffff" }}>
              {isLight ? data.ui.buttons.themeDark : data.ui.buttons.themeLight}
            </span>
          </button>
          <button
            id="nav-hamburger"
            className="flex flex-col gap-[5px] cursor-pointer p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px rounded-full transition-all ${isLight ? "bg-black" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-5 h-px rounded-full transition-all ${isLight ? "bg-black" : "bg-white"} ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-px rounded-full transition-all ${isLight ? "bg-black" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        } ${isLight ? "bg-white border-b border-black/[0.08]" : "bg-black border-b border-white/[0.08]"}`}
        style={{ top: "100%" }}
      >
        {links.map((l) => {
          const active = activeSection === l.href.slice(1);
          return (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-8 py-4 text-[0.9rem] font-semibold font-[family-name:var(--font-inter)] transition-colors border-b ${
                isLight
                  ? `border-black/[0.04] ${active ? "text-black bg-black/[0.04]" : "text-[#1d1d1f] hover:text-black"}`
                  : `border-white/[0.04] ${active ? "text-white bg-white/[0.06]" : "text-off-white hover:text-white"}`
              }`}
            >
              {l.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
