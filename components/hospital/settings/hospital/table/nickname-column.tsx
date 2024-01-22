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
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function NicknameColumn({
  nickname,
  vetId,
}: {
  nickname: string;
  vetId: string;
}) {
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
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
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

// export default function UpdateNickname({ nickname }: { nickname: string }) {
//   const [editMode, setEditMode] = useState(false);
//   const [nicknameInput, setNicknameInput] = useState(() => nickname);
//   return (
//     <div className="flex w-full max-w-sm items-center space-x-2">
//       {editMode ? (
//         <>
//           <Input
//             placeholder="Email"
//             className="w-28  p-2 h-7"
//             value={nicknameInput}
//             onChange={(e) => setNicknameInput(e.target.value)}
//           />
//           <CheckIcon
//             onClick={() => setEditMode(true)}
//             className="cursor-pointer hover:opacity-50 transition"
//           />
//           <Cross2Icon
//             onClick={() => setEditMode(false)}
//             className="cursor-pointer hover:opacity-50 transition"
//           />
//         </>
//       ) : (
//         <>
//           <p className="w-28">{nickname}</p>
//           <Pencil1Icon
//             onClick={() => setEditMode(true)}
//             className="cursor-pointer hover:opacity-50 transition"
//           />
//         </>
//       )}
//     </div>
//   );
// }
