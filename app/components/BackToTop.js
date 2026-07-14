"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../providers/ThemeProvider";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-7 right-7 z-[999] w-12 h-12 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
      }`}
      style={{
        background: isLight ? "#000000" : "#ffffff",
        borderColor: isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)",
        color: isLight ? "#ffffff" : "#000000",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      }}
      aria-label="Back to top"
    >
      <i className="fas fa-chevron-up" style={{ color: isLight ? "#ffffff" : "#000000" }} />
    </button>
  );
}
