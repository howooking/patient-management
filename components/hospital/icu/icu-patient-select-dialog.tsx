import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pet } from "@/types/type";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import IcuPatientTab from "./navbar/icu-patient-tab";

export default function IcuPatientSelectDialog({ pets }: { pets: Pet[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full w-6 h-6 flex items-center justify-center"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <IcuPatientTab setDialogOpen={setDialogOpen} pets={pets} search />
      </DialogContent>
    </Dialog>
  );
}
