"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedPet } from "@/lib/store/pets";
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
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const { selectedPet, setSelectedPet } = useSelectedPet();
  const { refresh } = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${location.origin}/api/pet`, {
        method: "DELETE",
        body: JSON.stringify({ petId }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "환자가 삭제되었습니다.",
        });
        if (selectedPet?.pet_id === petId) {
          setSelectedPet(null);
        }
        refresh();
        setDialogOpen(false);
        return;
      }

      toast({
        variant: "destructive",
        title: data.error,
        description: "관리자에게 문의하세요",
      });
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
