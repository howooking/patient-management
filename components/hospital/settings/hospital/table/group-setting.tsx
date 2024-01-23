import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { LuMinus, LuPlus } from "react-icons/lu";
import * as z from "zod";

export const groupListFormSchema = z.object({
  groupList: z.array(z.object({ group: z.string() })),
});

export default function GroupSetting({ groupList }: { groupList: string[] }) {
  const router = useRouter();
  const hospitalId = useCurrentHospitalId();
  const [open, setOpen] = useState(false);
  const supabase = createSupabaseBrowserClient();

  const { control, register, handleSubmit, reset } = useForm<
    z.infer<typeof groupListFormSchema>
  >({
    resolver: zodResolver(groupListFormSchema),
    defaultValues: {
      groupList: groupList.map((list) => ({ group: list })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupList",
  });

  const onSubmit = async (values: z.infer<typeof groupListFormSchema>) => {
    const updatedGoupList: string[] = values.groupList.map(
      (element) => element.group
    );

    const { error } = await supabase
      .from("hospitals")
      .update({ group_list: updatedGoupList })
      .match({ hos_id: hospitalId });
    if (error) {
      toast({
        variant: "destructive",
        title: error.message,
        description: "관리자에게 문의하세요",
      });
      return;
    }
    toast({
      title: "그룹명 설정이 수정되었습니다.",
    });
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      // onOpenChange={setOpen}
      onOpenChange={() => {
        reset();
        setOpen((prev) => !prev);
      }}
    >
      <DialogTrigger asChild>
        <Pencil1Icon className="cursor-pointer hover:opacity-50 transition text-primary" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>직원 명칭 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="space-y-1">
            {fields.map((item, index) => {
              return (
                <li key={item.id} className="flex items-center gap-2">
                  <Input {...register(`groupList.${index}.group`)} required />
                  <div className="flex-1 w-20 flex gap-1">
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      size="icon"
                      disabled={index === 0}
                      className="rounded-full w-4 h-4"
                    >
                      <LuMinus />
                    </Button>

                    <Button
                      type="button"
                      onClick={() => append({ group: "" })}
                      size="icon"
                      className="rounded-full w-4 h-4"
                    >
                      <LuPlus />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>

          <Button className="mt-2">수정</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
