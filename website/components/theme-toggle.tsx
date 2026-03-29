"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("qcml-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const saved = localStorage.getItem("qcml-theme");
    const current =
      saved === "dark" || saved === "light"
        ? saved
        : ((document.documentElement.dataset.theme as ThemeMode | undefined) ??
          "light");

    setTheme(current);
    applyTheme(current);
  }, []);

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
    >
      <span className="theme-toggle-indicator" aria-hidden="true" />
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
