"use client";

import { Separator } from "@repo/ui/components/element/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/element/sheet";
import useMainSidebar from "../hooks/use-main-sidebar";

export const MainSidebar = () => {
  const { isOpen, onClose } = useMainSidebar();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-start text-sm">メニュー</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <Separator />
      </SheetContent>
    </Sheet>
  );
};
