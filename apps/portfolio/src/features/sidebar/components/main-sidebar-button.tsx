"use client";

import { Menu } from "lucide-react";

import { Button } from "@repo/ui/components/input/button";

import useMainSidebar from "../hooks/use-main-sidebar";

export const MainSidebarButton = () => {
  const { onOpen } = useMainSidebar();

  return (
    <Button variant="ghost" onClick={onOpen}>
      <Menu className="h-6 w-6" />
    </Button>
  );
};
