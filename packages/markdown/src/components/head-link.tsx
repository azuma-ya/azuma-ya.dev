import type { HTMLAttributes } from "react";

import { cn } from "@repo/ui/lib/utils";
import { Link } from "lucide-react";

interface HeadLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  node?: Element | undefined;
}

export const HeadLink = ({
  id,
  node,
  children,
  className,
  ...props
}: HeadLinkProps) => {
  return (
    <a
      className={cn(
        "absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 duration-300",
        className,
      )}
      {...props}
    >
      <Link className="size-4 text-muted-foreground" />
    </a>
  );
};
