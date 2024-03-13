import { type IconType } from "react-icons";

export default function IcuPatientInfoCard({
  Icon,
  contents,
  title,
}: {
  Icon: IconType;
  contents: string;
  title: string;
}) {
  return (
    <div className="bg-gray-100 rounded-xl p-2 flex gap-2">
      <Icon className="text-primary w-5 h-5" />
      <div className="flex flex-col gap-1">
        <div className="text-gray-500">{title}</div>
        <div className="font-bold">{contents}</div>
      </div>
    </div>
  );
}
