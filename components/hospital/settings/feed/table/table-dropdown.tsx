import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { type FeedTableColumn } from "./columns";
import { DeleteFeedDialog } from "./delete-feed-dialog";
import { EditFeedDialog } from "./edit-feed-dialog";

export default function TableDropdown({ feed }: { feed: FeedTableColumn }) {
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

      <EditFeedDialog
        copy
        feed={feed}
        isEditDialogOpen={isCopyDialogOpen}
        setIsEditDialogOpen={setIsCopyDialogOpen}
      />

      <EditFeedDialog
        feed={feed}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />

      <DeleteFeedDialog
        feed={feed}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
