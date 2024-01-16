import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { DrugProductTableColumn } from "./columns";
import { DeleteDrugProductDialog } from "./delete-drug-product-dialog";
import { EditDrugProductDialog } from "./edit-drug-product-dialog";

export default function TableDropdown({
  drugProduct,
}: {
  drugProduct: DrugProductTableColumn;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full" size="icon">
            <span className="sr-only">Open menu</span>
            <MdMoreVert />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="flex flex-col gap-2">
          <DropdownMenuItem onClick={() => setIsCopyDialogOpen(true)}>
            복사
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            수정
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditDrugProductDialog
        copy
        drugProduct={drugProduct}
        isEditDialogOpen={isCopyDialogOpen}
        setIsEditDialogOpen={setIsCopyDialogOpen}
      />
      <EditDrugProductDialog
        drugProduct={drugProduct}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
      <DeleteDrugProductDialog
        drugProduct={drugProduct}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
