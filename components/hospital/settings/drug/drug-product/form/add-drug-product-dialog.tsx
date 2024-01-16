"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddDrugProductForm from "./add-drug-product-form";

export function AddDrugProductDialog({
  drugs,
}: {
  drugs: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">제품 추가</Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AddDrugProductForm setOpen={setOpen} drugs={drugs} />
      </DialogContent>
    </Dialog>
  );
}
