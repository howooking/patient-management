"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaMagnifyingGlass, FaHospital, FaHospitalUser } from "react-icons/fa6";

type Props = {
  title: string;
  desc: string;
  icon: string;
  query: string;
};

export default function OptionButton({ title, desc, icon, query }: Props) {
  const router = useRouter();
  return (
    <Button
      className="flex flex-col w-[280px] h-[280px] p-8 bg-primary/80 gap-8"
      onClick={() => router.push(`/new-hospital/${query}`)}
    >
      <div className="space-y-2">
        <div className="text-2xl">{title}</div>
        <div>{desc}</div>
      </div>
    </Button>
  );
}
