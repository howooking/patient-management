"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  selectedHospital:
    | {
        hospitalId: string;
        value: string | null;
      }
    | undefined;
  setSelectedHospital: Dispatch<
    SetStateAction<
      | {
          hospitalId: string;
          value: string | null;
        }
      | undefined
    >
  >;
};

export default function SearchBox({
  selectedHospital,
  setSelectedHospital,
}: Props) {
  const [open, setOpen] = useState(false);
  const [hospitals, setHospitals] = useState<
    {
      hospitalId: string;
      value: string | null;
      address: string | null;
    }[]
  >([]);

  const supabase = createSupabaseBrowserClient();
  useEffect(() => {
    const getHospitals = async () => {
      const { data, error } = await supabase
        .from("hospitals")
        .select("address, hos_id, name")
        .eq("business_approved", true)
        .eq("personal", false);

      if (error) {
        throw new Error("error while fethcing hospitals");
      }
      const mappedHospital = data.map((item) => ({
        hospitalId: item.hos_id,
        value: item.name,
        address: item.address,
      }));
      setHospitals(mappedHospital);
    };

    getHospitals();
  }, [supabase]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between border-input h-[40px] font-normal"
        >
          {selectedHospital
            ? hospitals.find(
                (hospital) =>
                  hospital.hospitalId === selectedHospital.hospitalId
              )?.value
            : "병원을 선택해주세요"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[400px] max-h-[300px] overflow-y-auto p-0">
        <Command>
          <CommandInput placeholder="병원 검색" className="h-9" />
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup>
            {hospitals.map((hospital) => (
              <CommandItem
                key={hospital.hospitalId}
                value={hospital.value!}
                onSelect={(currentValue) => {
                  setSelectedHospital(
                    currentValue === selectedHospital?.value
                      ? { hospitalId: "", value: "" }
                      : { hospitalId: hospital.hospitalId, value: currentValue }
                  );
                  setOpen(false);
                }}
              >
                <div className="flex justify-between w-full items-center">
                  <div>{hospital.value}</div>
                  <span className="text-sm">
                    {hospital.address?.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
