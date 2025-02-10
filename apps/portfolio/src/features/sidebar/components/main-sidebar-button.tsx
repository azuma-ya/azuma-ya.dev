"use client";

import { Button } from "@repo/ui/components/input/button";
import { Menu } from "lucide-react";
import useMainSidebar from "../hooks/use-main-sidebar";

export const MainSidebarButton = () => {
  const onOpen = useMainSidebar((state) => state.onOpen);

  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpen}>
      <Menu className="size-5!" />
    </Button>
  );
};
