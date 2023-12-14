"use client";

import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { IoSearch } from "react-icons/io5";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useTanstackPets from "@/hooks/useTanstackPet";
import { usePathname, useRouter } from "next/navigation";
import { Pet } from "@/types/type";
import NoResult from "./no-result";
import LoadingSpinner from "@/components/common/loading-spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchTab({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  }, []);

  const path = usePathname();
  const hospitalId = path.split("/")[2];
  const { data, error, isFetching, isLoading } = useTanstackPets(hospitalId);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    if (searchTerm === "") {
      setNoResult(false);
      setFilteredPets([]);
      return;
    }

    const filtered = data?.pets?.filter(
      (pet) =>
        pet.hos_pet_id.includes(searchTerm) ||
        pet.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    if (filtered?.length === 0) {
      setNoResult(true);
      setFilteredPets([]);
      return;
    }
    setNoResult(false);
    setFilteredPets(filtered ?? []);
  }, 300);

  if (data?.petsError) {
    console.error("supabse error", data?.petsError);
    return "supabase 에러가 발생했습니다.";
  }

  if (error) {
    console.error("tanstack error", error);
    return "에러가 발생했습니다.";
  }

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Input
        ref={inputRef}
        className="border-foreground"
        placeholder="환자이름, 환자번호로 검색해주세요"
        onChange={(e) => handleSearch(e.target.value)}
      />

      {noResult ? (
        <NoResult setActiveTab={setActiveTab} />
      ) : (
        <Table className="mt-4">
          <ScrollArea className="h-[430px]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">이름</TableHead>
                <TableHead className="text-center">번호</TableHead>
                <TableHead className="text-center">종</TableHead>
                <TableHead className="text-center">품종</TableHead>
                <TableHead className="text-center">성별</TableHead>
                <TableHead className="text-center">출생일</TableHead>
                <TableHead className="text-center">자세히</TableHead>
                <TableHead className="text-center">선택</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPets?.map((pet) => (
                <TableRow key={pet.pet_id}>
                  <TableCell className="text-center text-xs">
                    {pet.name}
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    {pet.hos_pet_id}
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    {pet.species}
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    {pet.breed}
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    {pet.gender}
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    {pet.birth}
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    <Button
                      className="px-2 py-0.5 h-6"
                      size="sm"
                      variant="ghost"
                    >
                      선택
                    </Button>
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    <Button className="px-2 py-0.5 h-6" size="sm">
                      선택
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ScrollArea>
        </Table>
      )}
    </div>
  );
}
