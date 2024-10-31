"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [activeTheme, setActiveTheme] = useState<string>("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "system" || !savedTheme) {
      applySystemTheme();
      setActiveTheme("system");
    } else {
      applyTheme(savedTheme);
      setActiveTheme(savedTheme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (!savedTheme || savedTheme === "system") {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const applyTheme = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "system") {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  };

  const applySystemTheme = () => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <main className="flex items-center justify-center p-96 pt-32">
      <div>
        <h1 className="text-center font-bold text-slate-900 dark:text-cyan-500 text-5xl leading-tight mb-3">
          Tailwind CSS: Dark Mode Tutorial
        </h1>
        <p className="text-lg font-medium text-slate-700 dark:text-cyan-700 text-center mb-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
          corporis officia illum saepe voluptates, assumenda molestiae
          exercitationem quisquam illo omnis? Fuga, voluptates? Eum dolor ipsam
          expedita perspiciatis doloremque, ad illo!
        </p>

        <div className="flex items-center">
          <button
            onClick={() => handleThemeChange("light")}
            className={`flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold py-[10px] px-4 ${
              activeTheme === "light"
                ? "bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600 text-gray-50"
                : "bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-100 dark:text-gray-400"
            }`}
          >
            Light Theme
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className={`flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold py-[10px] px-4 ${
              activeTheme === "dark"
                ? "bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600 text-gray-50"
                : "bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-50 dark:text-gray-400"
            }`}
          >
            Dark Theme
          </button>
          <button
            onClick={() => handleThemeChange("system")}
            className={`flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold py-[10px] px-4 ${
              activeTheme === "system"
                ? "bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600 text-gray-50"
                : "bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-50 dark:text-gray-400"
            }`}
          >
            Use System Theme
          </button>
        </div>
      </div>
    </main>
  );
}
