"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/navigation/dropdown-menu.js";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, type ButtonProps } from "@repo/ui/components/input/button";
import { cn } from "@repo/ui/lib/utils.js";

const ThemeButton = ({ variant, size, ...props }: ButtonProps) => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={variant || "outline"} size={size || "icon"} {...props}>
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "text-xs",
            theme === "light" && "text-blue-500 focus:text-blue-500",
          )}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "text-xs",
            theme === "dark" && "text-blue-500 focus:text-blue-500",
          )}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "text-xs",
            theme === "system" && "text-blue-500 focus:text-blue-500",
          )}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeButton };
