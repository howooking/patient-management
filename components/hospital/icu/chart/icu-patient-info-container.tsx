import { type IconType } from "react-icons";

export default function IcuPatientInfoContainer({
  Icon,
  contents,
  title,
  children,
}: {
  Icon: IconType;
  contents: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 rounded-xl p-2 flex gap-2 relative">
      <Icon className="text-primary w-5 h-5 shrink-0" />
      <div className="flex flex-col gap-1">
        <div className="text-gray-500">{title}</div>
        <div className="font-bold">{contents}</div>
      </div>

      {/* edit dialog */}
      {children}
    </div>
  );
}
