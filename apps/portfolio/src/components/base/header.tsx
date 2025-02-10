import { MainSidebarButton } from "@/features/sidebar/components/main-sidebar-button";
import { ThemeButton } from "@repo/ui/components/input/theme-button";
import { Container } from "@repo/ui/components/layout/container";
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
        <div className="flex items-center gap2">
          <ThemeButton variant="ghost" />
        </div>
      </Container>
    </header>
  );
};

export const HeaderSpacing = () => {
  return <div className="h-(--header-height)" />;
};
