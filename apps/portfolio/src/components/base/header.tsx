"use client";

import { Button } from "@repo/ui/components/input/button";
import { ThemeButton } from "@repo/ui/components/input/theme-button";
import { Container } from "@repo/ui/components/layout/container";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const routes = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blogs",
      href: "/blogs",
    },
    {
      name: "Works",
      href: "/works",
    },
    {
      name: "Timeline",
      href: "/timeline",
    },
  ];

  return (
    <header className="fixed z-50 inset-x-0 bg-background/50 backdrop-blur-sm h-(--header-height) ">
      <Container
        maxWidth="xl"
        className="flex items-center justify-between h-full"
      >
        <nav className="flex items-center gap-2">
          {routes.map((route) => (
            <Button
              key={route.name}
              variant="link"
              className={cn(
                "text-xs h-fit py-1",
                (route.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(route.href)) && "underline",
              )}
              asChild
            >
              <Link href={route.href}>{route.name}</Link>
            </Button>
          ))}
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
