import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { DrugTableColumn } from "./columns";
import { DeleteDrugDialog } from "./delete-drug-dialog";
import { EditDrugDialog } from "./edit-drug-dialog";

export default function TableDropdown({ drug }: { drug: DrugTableColumn }) {
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

      <EditDrugDialog
        copy
        drug={drug}
        isEditDialogOpen={isCopyDialogOpen}
        setIsEditDialogOpen={setIsCopyDialogOpen}
      />
      <EditDrugDialog
        drug={drug}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
      <DeleteDrugDialog
        drug={drug}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
