"use client";

import useMainSidebar from "@/features/sidebar/hooks/use-main-sidebar";
import { Button } from "@repo/ui/components/input/button";
import { ThemeButton } from "@repo/ui/components/input/theme-button";
import { Container } from "@repo/ui/components/layout/container";
import { cn } from "@repo/ui/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const onOpen = useMainSidebar((state) => state.onOpen);

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
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpen}
        >
          <Menu />
        </Button>
        <nav className="items-center gap-2 hidden md:flex">
          {routes.map((route) => (
            <Button
              key={route.name}
              variant="link"
              className={cn(
                "text-base h-fit py-1",
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
