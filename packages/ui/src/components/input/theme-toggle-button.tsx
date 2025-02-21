"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, type ButtonProps } from "@repo/ui/components/input/button";
import {} from "@repo/ui/components/navigation/dropdown-menu";

const ThemeToggleButton = ({ variant, size, ...props }: ButtonProps) => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={variant || "outline"}
      size={size || "icon"}
      {...props}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="size-5! rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-5! rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ThemeToggleButton };
