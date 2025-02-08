"use client";

import { Button } from "@repo/ui/components/input/button";
import { ThemeButton } from "@repo/ui/components/input/theme-button";
import { Container } from "@repo/ui/components/layout/container";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="fixed z-50 inset-x-0 bg-background/50 backdrop-blur-sm h-(--header-height)">
      <Container
        maxWidth="xl"
        className="flex items-center justify-between h-full"
      >
        <nav className="flex items-center gap-2">
          <Button variant="link" className="text-xs h-fit py-1" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="link" className="text-xs h-fit py-1" asChild>
            <Link href="/blogs">Blogs</Link>
          </Button>
          <Button variant="link" className="text-xs h-fit py-1" asChild>
            <Link href="/timeline">Timeline</Link>
          </Button>
        </nav>
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
