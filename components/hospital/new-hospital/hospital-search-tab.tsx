"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedPet } from "@/lib/store/pets";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchBox from "./search-box";

export default function HospitalSearchTab() {
  const supabase = createSupabaseBrowserClient();

  const [selecteHospital, setSelectedHospital] = useState<{
    hospitalId: string;
    value: string | null;
  }>();

  const router = useRouter();
  const { toast } = useToast();
  const { setSelectedPet } = useSelectedPet();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    try {
      const { data, error } = await supabase
        .from("hos_vet_mapping")
        .insert({ hos_id: selecteHospital?.hospitalId!, vet_id: user.id })
        .select("*")
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      const { error: defaultHosError } = await supabase
        .from("vets")
        .update({ default_hos_id: data.hos_id })
        .eq("vet_id", user.id)
        .is("default_hos_id", null);

      if (defaultHosError) {
        toast({
          variant: "destructive",
          title: defaultHosError.message,
          description: "관리자에게 문의하세요",
        });
        return;
      }

      toast({
        title: "병원에서 승인 후 병원이 추가됩니다.",
        description: "잠시 후 페이지가 이동합니다.",
      });
      setSelectedPet(null);
      router.replace(`/hospital/${data.hos_id}`);
      router.refresh();
      return;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "병원 검색 추가 중 오류 발생",
        description: "관리자에게 문의하세요",
      });
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

        <Button
          type="submit"
          className="font-semibold"
          disabled={isSubmitting || !selecteHospital}
        >
          병원추가
          <AiOutlineLoading3Quarters
            className={cn("ml-2", isSubmitting ? "animate-spin" : "hidden")}
          />
        </Button>
      </div>
    </form>
  );
}
