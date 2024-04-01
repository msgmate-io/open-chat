import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';

const screens = {
  sm: "640px",
  // => @media (min-width: 640px) { ... }

  md: "768px",
  // => @media (min-width: 768px) { ... }

  lg: "1024px",
  // => @media (min-width: 1024px) { ... }

  xl: "1280px",
  // => @media (min-width: 1280px) { ... }

  "2xl": "1536px",
  // => @media (min-width: 1536px) { ... }
}
const breakpoints = screens;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const [queryResult, setQueryResult] = useState(true);
  // https://stackoverflow.com/a/71098593
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });

  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  useEffect(() => {
    // Layout sizes can only be determined client-side
    // we return 'false' by default and just set it after hidration to avoid and SSR issues
    setQueryResult(bool);
  }, []);

  useEffect(() => {
    if (queryResult !== bool) {
      setQueryResult(bool);
    }
  }, [bool]);
  return {
    [`is${capitalizedKey}`]: queryResult,
  } as Record<Key, boolean>;
}

export const useClientside = (defaultValue, useElseValue) => {
  return typeof window === 'undefined' ? defaultValue : useElseValue;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
