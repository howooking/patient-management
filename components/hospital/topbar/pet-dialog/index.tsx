"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoSearch } from "react-icons/io5";
import PetTab from "./pet-tab";
import Image from "next/image";
import addDogIcon from "@/public/icons/add-dog.svg";
import { useState } from "react";

export default function PetDialog({ search }: { search?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant={search ? "ghost" : "default"}
          className="rounded-full"
        >
          {search ? (
            <IoSearch size={20} />
          ) : (
            <Image
              src={addDogIcon}
              alt="dog with plus sign icon"
              unoptimized
              width={20}
            />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="h-[530px]">
        <PetTab search={search} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
