import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";

export default function OptionButton({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: IconType;
}) {
  return (
    <Button className="flex flex-col h-auto w-[300px] p-4 bg-primary/80">
      <Icon size={100} />
      <div className="text-2xl">{title}</div>
      <div>{desc}</div>
    </Button>
  );
}
