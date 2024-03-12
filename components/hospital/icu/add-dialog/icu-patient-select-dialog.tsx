"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pet } from "@/types/type";
import { useState } from "react";
import IcuPatientTab from "./icu-patient-tab";
import { PlusIcon } from "@radix-ui/react-icons";

export default function IcuPatientSelectDialog({ pets }: { pets: Pet[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="text-xs h-6 px-2 flex gap-1">
          <PlusIcon className="w-3 h-3" />
          환자 입원
        </Button>
      </DialogTrigger>

      <DialogContent>
        <IcuPatientTab setDialogOpen={setDialogOpen} pets={pets} search />
      </DialogContent>
    </Dialog>
  );
}
