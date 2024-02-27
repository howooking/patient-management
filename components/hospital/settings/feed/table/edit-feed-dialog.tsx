import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import AddFeedForm from "../form/add-feed-form";
import { FeedTableColumn } from "./columns";

export function EditFeedDialog({
  feed,
  copy,
  isEditDialogOpen,
  setIsEditDialogOpen,
}: {
  feed: FeedTableColumn;
  copy?: boolean;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <AddFeedForm
          copy={copy}
          setOpen={setIsEditDialogOpen}
          edit
          feed={feed}
        />
      </DialogContent>
    </Dialog>
  );
}
