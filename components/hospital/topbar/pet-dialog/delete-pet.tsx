"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useSelectedPet } from "@/lib/store/pets";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";

export default function DeletePet({
  petId,
  setDialogOpen,
}: {
  petId: number;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const supabase = createSupabaseBrowserClient();

  const { selectedPet, setSelectedPet } = useSelectedPet();
  const { refresh } = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error: petError } = await supabase
        .from("pets")
        .delete()
        .match({ pet_id: petId });

      if (petError) {
        toast({
          variant: "destructive",
          title: petError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      toast({
        title: "환자가 삭제되었습니다.",
      });

      if (selectedPet?.pet_id === petId) {
        setSelectedPet(null);
      }
      refresh();
      setDialogOpen(false);
      return;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, "error while deleting a pet");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      type="button"
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <FaTrash />
      )}
    </Button>
  );
}
