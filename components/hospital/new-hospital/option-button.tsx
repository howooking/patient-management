import Link from "next/link";
import { IconType } from "react-icons";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  desc: string;
  icon: IconType;
  query: string;
};

export default function OptionButton({
  title,
  desc,
  icon: Icon,
  query,
}: Props) {
  return (
    <Button
      className="flex flex-col w-[280px] h-[280px] p-8 bg-primary/80 gap-8"
      asChild
    >
      <Link href={`/new-hospital/${query}`}>
        <Icon size={80} />
        <div className="space-y-2 text-center">
          <div className="text-2xl">{title}</div>
          <div>{desc}</div>
        </div>
      </Link>
    </Button>
  );
}
