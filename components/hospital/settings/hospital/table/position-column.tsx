import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  position: string;
  positionList: string[];
  vetId: string;
};

export default function PositionColumn({
  position,
  positionList,
  vetId,
}: Props) {
  const supabase = createSupabaseBrowserClient();
  const hospitalId = useCurrentHospitalId();

  const handlePosition = async (value: string) => {
    const { error } = await supabase
      .from("hos_vet_mapping")
      .update({ position: value })
      .match({ vet_id: vetId, hos_id: hospitalId });
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
      <Select onValueChange={handlePosition} defaultValue={position}>
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-28">
          <SelectGroup>
            {positionList.map((element) => (
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
