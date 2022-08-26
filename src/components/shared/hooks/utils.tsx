import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

import { ESystemAppearance } from "../../shared/types/common";

const currentWindow = typeof window !== "undefined" ? window : null;

export const useThemeDetector = () => {
  const [value, setValue] = useLocalStorage<any>("systemAppearance");

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    isAppearanceDark(value)
  );

  const mediaQueryListener = (e: MediaQueryListEvent) => {
    const userOptedAppearance =
      window?.localStorage?.getItem("systemAppearance");
    setValue(
      (userOptedAppearance as ESystemAppearance) ?? ESystemAppearance.AUTO
    );

    if (userOptedAppearance === ESystemAppearance.AUTO) {
      setIsDarkTheme(e?.matches);
    } else {
      setIsDarkTheme(isAppearanceDark(value));
    }
  };

  useEffect(() => {
    setIsDarkTheme(isAppearanceDark(value));
  }, [value]);

  useEffect(() => {
    const darkThemeMediaQuery = currentWindow?.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    darkThemeMediaQuery?.addEventListener("change", mediaQueryListener);

    return () => {
      darkThemeMediaQuery?.removeEventListener("change", mediaQueryListener);
    };
  }, [mediaQueryListener]);

  return { isDarkTheme, setIsDarkTheme, isAppearanceDark };
};

export const isAppearanceDark = (
  systemAppearance?: ESystemAppearance
): boolean => {
  switch (systemAppearance) {
    case ESystemAppearance.LIGHT:
      return false;
    case ESystemAppearance.DARK:
      return true;
    case ESystemAppearance.AUTO:
    default:
      return window?.matchMedia("(prefers-color-scheme: dark)")?.matches;
  }
};
