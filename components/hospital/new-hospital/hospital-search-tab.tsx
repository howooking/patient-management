import { Button } from "@/components/ui/button";
import SearchBox from "./search-box";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

export default function HospitalSearchTab() {
  const [selecteHospital, setSelectedHospital] = useState<{
    hospitalId: string;
    value: string | null;
  }>();

  const router = useRouter();

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const response = await fetch(`${location.origin}/api/new-hospital`, {
      //   method: "POST",
      //   body: JSON.stringify({
      //     type: "real",
      //     name,
      //     businessNumber,
      //     address,
      //     phoneNumber,
      //   }),
      // });
      // if (response.ok) {
      //   toast({
      //     title: `${values.name}이 생성되었습니다.`,
      //     description: "사업자등록증 확인 후 생성이 완료됩니다.",
      //   });
      //   router.replace("/");
      //   router.refresh();
      //   return;
      // }
      // const data = await response.json();
      // toast({
      //   variant: "destructive",
      //   title: data.error,
      //   description: "관리자에게 문의하세요",
      // });
    } catch (error) {
      console.error(error, "error while adding a hospital");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <div className="text-lg font-semibold mb-2">병원 이름</div>
        <SearchBox
          selectedHospital={selecteHospital}
          setSelectedHospital={setSelectedHospital}
        />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          뒤로가기
        </Button>

        <Button type="submit" className="font-semibold" disabled={isSubmitting}>
          병원등록
          <AiOutlineLoading3Quarters
            className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
          />
        </Button>
      </div>
    </form>
  );
}
