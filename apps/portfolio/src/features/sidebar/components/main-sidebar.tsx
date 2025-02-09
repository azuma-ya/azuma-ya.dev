"use client";

import { usePathname, useRouter } from "next/navigation";

import { Separator } from "@repo/ui/components/data-display/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/feedback/sheet";
import { Button } from "@repo/ui/components/input/button";
import { cn } from "@repo/ui/lib/utils";

import useMainSidebar from "../hooks/use-main-sidebar";

export const MainSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, onClose } = useMainSidebar();

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

  const onNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-start">Azuma-ya</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="flex flex-col justify-center h-full gap-8">
          <nav className="space-y-2">
            {routes.map((route) => (
              <Button
                key={route.name}
                variant="link"
                className={cn(
                  "text-base h-fit py-1 block w-full text-start",
                  (route.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(route.href)) && "underline",
                )}
                onClick={() => onNavigate(route.href)}
              >
                {route.name}
              </Button>
            ))}
          </nav>
          <Separator />
          <div className="h-24" />
        </div>
        <SheetFooter />
        <SheetFooter>
          <p className="text-muted-foreground text-center text-xs">
            &copy; {new Date().getFullYear()} Azuma-ya
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
