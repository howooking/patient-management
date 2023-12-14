"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import addDogIcon from "@/public/icons/add-dog.svg";
import Image from "next/image";

export default function AddPetButton() {
  const pathname = usePathname();
  const hospitalId = pathname.split("/")[2];
  return (
    <Button className="rounded-full" asChild size="icon">
      <Link href={`/hospital/${hospitalId}/patients/new`}>
        <Image
          src={addDogIcon}
          alt="dog with plus sign icon"
          unoptimized
          width={20}
        />
      </Link>
    </Button>
  );
}
