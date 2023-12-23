"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoSearchOutline } from "react-icons/io5";
import PetTab from "./pet-tab";
import Image from "next/image";
import addDogIcon from "@/public/icons/add-dog.svg";
import { useState } from "react";

export default function PetDialog({ search }: { search?: boolean }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant={search ? "ghost" : "default"}
          className="rounded-full"
        >
          {search ? (
            <IoSearchOutline size={20} />
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

      <DialogContent>
        <PetTab search={search} setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
}
