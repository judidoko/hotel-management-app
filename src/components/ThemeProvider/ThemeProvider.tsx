"use client";

import ThemeContext from "@/context/themeContext";
import { useState, useEffect } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  //   Storing theme to localStorage
  const themeFromStorage: boolean =
    typeof localStorage !== "undefined" && localStorage.getItem("hotel-theme")
      ? JSON.parse(localStorage.getItem("hotel-theme")!)
      : false;
  // Hooks
  const [darkTheme, setDarkTheme] = useState<boolean>(themeFromStorage);
  const [renderComponent, setRenderComponent] = useState(false);

  //   useEffect hook to check if dark-theme actually mount to the screen
  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""} min-h-full`}>
        <div className="dark:text-white dark:bg-black text-[#202020]">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
