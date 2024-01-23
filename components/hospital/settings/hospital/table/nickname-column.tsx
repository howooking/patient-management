import { Pencil1Icon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Props = {
  nickname: string;
  vetId: string;
};

export function NicknameColumn({ nickname, vetId }: Props) {
  const [open, setOpen] = useState(false);
  const { refresh } = useRouter();
  const [nicknameInput, setNicknameInput] = useState("");
  const supabase = createSupabaseBrowserClient();

  const handleUpdateNickname = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from("hos_vet_mapping")
      .update({ nickname: nicknameInput })
      .match({ vet_id: vetId });

    if (error) {
      toast({
        variant: "destructive",
        title: error.message,
        description: "관리자에게 문의하세요",
      });
      return;
    }

    toast({
      title: "직원 명칭을 수정하였습니다.",
    });
    refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil1Icon className="cursor-pointer hover:opacity-50 transition" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>직원 명칭 수정</DialogTitle>
          <DialogDescription>오원장, 김과장 등</DialogDescription>
        </DialogHeader>
        <form
          className="flex items-center space-x-2"
          onSubmit={handleUpdateNickname}
        >
          <div className="grid flex-1 gap-2">
            <Input
              defaultValue={nickname}
              onChange={(e) => setNicknameInput(e.target.value)}
            />
          </div>
          <Button type="submit" className="px-3">
            수정
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
