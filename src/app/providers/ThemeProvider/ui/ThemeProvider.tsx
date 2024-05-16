import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localstorage";
import { ThemeContext } from "@/shared/lib/context/ThemeContext";
import { Theme } from "@/shared/types/theme";
import { useState, useMemo, ReactNode } from "react";

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
