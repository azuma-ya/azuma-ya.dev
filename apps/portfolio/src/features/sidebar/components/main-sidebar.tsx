"use client";

import { useRouter } from "next/navigation";

import { Separator } from "@repo/ui/components/data-display/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/feedback/sheet";

import { Navigation } from "@/components/base/navigation";
import type { Info } from "@/features/profile/types/info";
import useMainSidebar from "../hooks/use-main-sidebar";

interface MainSidebarProps {
  data: Info;
}

export const MainSidebar = ({ data }: MainSidebarProps) => {
  const router = useRouter();
  const { isOpen, onClose } = useMainSidebar();

  const onNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-start">{data.name}</SheetTitle>
          <SheetDescription className="text-start">{data.bio}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-center h-full gap-8">
          <Navigation orientation="vertical" onClick={onNavigate} />
          <Separator />
          <div className="h-24" />
        </div>
        <SheetFooter />
        <SheetFooter>
          <p className="text-muted-foreground text-center text-xs">
            &copy; {new Date().getFullYear()} {data.name}
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
