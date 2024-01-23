import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  group: string;
  groupList: string[];
  vetId: string;
};

export default function GroupColumn({ group, groupList, vetId }: Props) {
  const supabase = createSupabaseBrowserClient();

  const handleGroup = async (value: string) => {
    const { error } = await supabase
      .from("hos_vet_mapping")
      .update({ group: value })
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
      title: "소속을 변경하였습니다.",
    });
  };

  return (
    <>
      <Select onValueChange={handleGroup} defaultValue={group}>
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-20">
          <SelectGroup>
            {groupList.map((element) => (
              <SelectItem value={element} key={element}>
                {element}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
