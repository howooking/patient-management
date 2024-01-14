import { Dialog, DialogContent } from "@/components/ui/dialog";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { type DrugDose } from "@/types/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddDrugForm from "../form/add-drug-form";
import { DrugTableColumn } from "./columns";

export function EditDrugDialog({
  drug,
  copy,
  isEditDialogOpen,
  setIsEditDialogOpen,
}: {
  drug: DrugTableColumn;
  copy?: boolean;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [doseDetail, setDoseDetail] = useState<DrugDose[]>([]);

  const supabase = createSupabaseBrowserClient();

  // TODO: client side error handling
  useEffect(() => {
    const getData = async () => {
      const { data: drugDoses, error: drugsError } = await supabase
        .from("drug_doses")
        .select("*")
        .match({ drug_id: drug.id });
      if (!drugsError) {
        setDoseDetail(drugDoses);
      }
    };
    getData();
  }, [drug.id, supabase]);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AddDrugForm
          copy={copy}
          setOpen={setIsEditDialogOpen}
          edit
          drug={drug}
          doseDetail={doseDetail}
        />
      </DialogContent>
    </Dialog>
  );
}
