import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface TooltipWrapperProps {
  children: React.ReactNode;
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export const TooltipWrapper = ({
  children,
  label,
  side = "right",
  sideOffset = 10,
}: TooltipWrapperProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} sideOffset={sideOffset}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
