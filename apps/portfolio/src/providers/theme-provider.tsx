"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // React 19 / Next 16 fix: suppress the <script> tag warning by
  // telling next-themes to use type="application/json" instead of
  // type="text/javascript", which React won't try to execute
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
};
