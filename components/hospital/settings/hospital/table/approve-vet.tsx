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

export default function ApproveVet({
  approved,
  vetId,
}: {
  approved: boolean;
  vetId: string;
}) {
  const supabase = createSupabaseBrowserClient();

  const handleApprove = async (value: "true" | "false") => {
    const { error } = await supabase
      .from("hos_vet_mapping")
      .update({ vet_approved: value === "true" ? true : false })
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
      title: `${
        value === "true" ? "승인하였습니다." : "승인을 취소하였습니다."
      }`,
    });
  };

  return (
    <Select
      defaultValue={approved ? "true" : "false"}
      onValueChange={handleApprove}
    >
      <SelectTrigger className="w-20">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-20">
        <SelectGroup>
          <SelectItem value="true">승인</SelectItem>
          <SelectItem value="false">미승인</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
