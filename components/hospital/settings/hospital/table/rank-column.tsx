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
  rank: number;
  vetId: string;
  length: number;
};

export default function RankColumn({ rank, vetId, length }: Props) {
  const supabase = createSupabaseBrowserClient();

  const handlePosition = async (value: string) => {
    const { error } = await supabase
      .from("hos_vet_mapping")
      .update({ rank: Number(value) })
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
      title: "순번을 변경하였습니다.",
    });
  };

  return (
    <>
      <Select onValueChange={handlePosition} defaultValue={rank.toString()}>
        <SelectTrigger className="w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {new Array(length).fill(0).map((_, index) => (
              <SelectItem value={`${index + 1}`} key={index}>
                {index + 1}
              </SelectItem>
            ))}
            {/* <Button
              className="w-full"
              variant="ghost"
              onClick={() => setCount((prev) => prev + 1)}
            >
              +
            </Button> */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
