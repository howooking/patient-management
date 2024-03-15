import { cn } from "@/lib/utils";
import { type IconType } from "react-icons";

export default function IcuPatientInfoContainer({
  Icon,
  contents,
  title,
  children,
  className,
}: {
  Icon: IconType;
  contents?: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-gray-100 rounded-lg p-2 flex flex-col relative",
        className
      )}
    >
      <div className="flex gap-2 items-center">
        <Icon className="text-primary w-5 h-5 shrink-0" />
        <span className="text-gray-500 text-xs">{title}</span>
        <span className="font-bold">{contents}</span>
      </div>

      {/* edit dialog or textarea */}
      {children}
    </div>
  );
}
