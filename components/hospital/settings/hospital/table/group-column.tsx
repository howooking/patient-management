import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

const groupListSchema = z.object({
  group: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "적어도 하나의 그룹을 선택해주세요.",
  }),
});

type Props = {
  groupList: string[];
  group: string[];
  vetId: string;
};

export function GroupColumn({ groupList, group, vetId }: Props) {
  const [open, setOpen] = useState(false);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof groupListSchema>>({
    resolver: zodResolver(groupListSchema),
    defaultValues: {
      group,
    },
  });

  const onSubmit = async (value: z.infer<typeof groupListSchema>) => {
    const { error } = await supabase
      .from("hos_vet_mapping")
      .update({ group: value.group })
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
      title: "그룹을 수정하였습니다.",
    });
    router.refresh();
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <div>{group.length === 0 ? "미등록" : `#${group.join("#")}`}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pencil1Icon className="cursor-pointer hover:opacity-50 transition" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>그룹 수정</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="group"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormDescription>
                        한개 이상의 그룹을 선택해주세요.
                      </FormDescription>
                    </div>
                    {groupList.map((list) => (
                      <FormField
                        key={list}
                        control={form.control}
                        name="group"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={list}
                              className="flex flex-row items-center gap-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(list)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, list])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== list
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {list}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">수정</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
