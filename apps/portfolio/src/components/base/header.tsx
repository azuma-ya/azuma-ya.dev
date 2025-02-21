import { ThemeToggleButton } from "@repo/ui/components/input/theme-toggle-button";
import { Container } from "@repo/ui/components/layout/container";

import { MainSidebarButton } from "@/features/sidebar/components/main-sidebar-button";
import { Button } from "@repo/ui/components/input/button";
import { Github } from "lucide-react";
import { Navigation } from "./navigation";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 inset-x-0 bg-background/50 backdrop-blur-sm h-(--header-height) ">
      <Container
        maxWidth="xl"
        className="flex items-center justify-between h-full"
      >
        <MainSidebarButton />
        <Navigation className="hidden md:flex" />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            asChild
          >
            <a href="https://github.com/azuma-ya/azuma-ya.life">
              <Github />
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
