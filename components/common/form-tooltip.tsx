import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";

export default function FormTooltip({ title }: { title: string }) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger tabIndex={-1} type="button">
          <FaRegCircleQuestion className="opacity-50" />
        </TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
