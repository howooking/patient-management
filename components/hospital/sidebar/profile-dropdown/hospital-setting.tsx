import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type Props = {
  hospitalList:
    | {
        hospitals: {
          hos_id: string;
          name: string | null;
          business_approved: boolean;
        } | null;
      }[]
    | undefined;
};

export default async function HospitalSetting({ hospitalList }: Props) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>병원 설정</DropdownMenuSubTrigger>

      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>
            <Link href="/new-hospital/search"> + 병원 추가하기</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator
            className={hospitalList?.length === 0 ? "hidden" : "block"}
          />

          {hospitalList?.map((hos) => (
            <DropdownMenuItem key={hos.hospitals?.hos_id}>
              {hos.hospitals?.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
