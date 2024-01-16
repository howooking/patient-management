import { Dialog, DialogContent } from "@/components/ui/dialog";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddDrugProductForm from "../form/add-drug-product-form";
import { DrugProductTableColumn } from "./columns";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";

export function EditDrugProductDialog({
  drugProduct,
  copy,
  isEditDialogOpen,
  setIsEditDialogOpen,
}: {
  drugProduct: DrugProductTableColumn;
  copy?: boolean;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const supabase = createSupabaseBrowserClient();
  const hospitalId = useCurrentHospitalId();
  const [drugs, setDrugs] = useState<{ name: string; id: string }[] | null>([]);

  // TODO: client side error handling
  useEffect(() => {
    const getData = async () => {
      const { data: drugs, error: drugsErrors } = await supabase
        .from("drugs")
        .select("id, name")
        .match({ hos_id: hospitalId });

      if (!drugsErrors) setDrugs(drugs);
    };
    getData();
  }, [hospitalId, supabase]);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AddDrugProductForm
          drugs={drugs}
          copy={copy}
          setOpen={setIsEditDialogOpen}
          edit
          drugProduct={drugProduct}
        />
      </DialogContent>
    </Dialog>
  );
}
