"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@repo/ui/components/input/button";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  orientation?: "horizontal" | "vertical";
  onClick?: (href: string) => void;
  className?: string;
};

const routes = [
  {
    name: "Home",
    href: "/",
  },
];

export const Navigation = ({
  orientation = "horizontal",
  onClick,
  className,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const onNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <nav
      className={cn(
        orientation === "horizontal" ? "items-center gap-2" : "space-y-2",
        className,
      )}
    >
      {routes.map((route) => (
        <Button
          key={route.name}
          variant="link"
          className={cn(
            orientation === "horizontal"
              ? "text-base h-fit py-1"
              : "text-base h-fit py-1 block w-full text-start",
            (route.href === "/"
              ? pathname === "/"
              : pathname.startsWith(route.href)) && "underline",
          )}
          onClick={() => onClick?.(route.href) || onNavigate(route.href)}
        >
          {route.name}
        </Button>
      ))}
    </nav>
  );
};
