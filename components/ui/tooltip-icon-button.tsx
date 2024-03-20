import { type IconType } from "react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Button } from "./button";
import { Dispatch, SetStateAction } from "react";

export default function TooltipIconButton({
  Icon,
  description,
  setOpen,
}: {
  Icon: IconType;
  description: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger tabIndex={-1} asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpen(true)}
            className="w-8 h-8 rounded-none border-l-0"
          >
            <Icon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
