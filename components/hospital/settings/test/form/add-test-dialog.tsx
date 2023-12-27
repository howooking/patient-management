"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddTestForm from "./add-test-form";

export function AddTestDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">검사 추가</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[calc(100vw-40px)] max-h-[90vh] overflow-y-auto">
        <AddTestForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
