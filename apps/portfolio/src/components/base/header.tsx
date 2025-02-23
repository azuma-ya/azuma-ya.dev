import { Github } from "lucide-react";

import { Button } from "@repo/ui/components/input/button";
import { ThemeToggleButton } from "@repo/ui/components/input/theme-toggle-button";
import { Container } from "@repo/ui/components/layout/container";

import { MainSidebarButton } from "@/features/sidebar/components/main-sidebar-button";
import { Navigation } from "./navigation";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 inset-x-0 bg-background/50 backdrop-blur-xs h-(--header-height) ">
      <Container
        maxWidth="xl"
        className="flex items-center justify-between h-full"
      >
        <MainSidebarButton />
        <Navigation className="hidden md:flex" />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <a
              href="https://github.com/azuma-ya/azuma-ya.life"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="size-5!" />
            </a>
          </Button>
          <ThemeToggleButton variant="ghost" />
        </div>
      </Container>
    </header>
  );
};

export const HeaderSpacing = () => {
  return <div className="h-(--header-height)" />;
};
