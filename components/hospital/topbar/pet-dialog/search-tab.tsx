import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCurrentHospitalId from "@/hooks/useCurrentHospital";
import useTanstackPets from "@/hooks/useTanstackPet";
import { useSelectedPet } from "@/lib/store/pets";
import type { Pet } from "@/types/type";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import EditPetDialog from "./edit-pet-dialog";
import NoResult from "./no-result";
import LoadingLogo from "@/components/common/loading-logo";

type Props = {
  setActiveTab: Dispatch<SetStateAction<string>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SearchTab({ setActiveTab, setDialogOpen }: Props) {
  const { setSelectedPet } = useSelectedPet();

  const hospitalId = useCurrentHospitalId();
  const { data, error, isFetching, isLoading } = useTanstackPets(hospitalId);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isFetching]);

  const [filteredPets, setFilteredPets] = useState<Pet[]>(data?.pets ?? []);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    if (searchTerm === "") {
      setNoResult(false);
      setFilteredPets(data?.pets ?? []);
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
    // eslint-disable-next-line no-console
    console.error("supabse error", data?.petsError);
    return "supabase 에러가 발생했습니다.";
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error("tanstack error", error);
    return "에러가 발생했습니다.";
  }

  if (isLoading || isFetching) {
    return (
      <div className="h-[480px]">
        <LoadingLogo />
      </div>
    );
  }

  return (
    <div>
      <Input
        ref={inputRef}
        className="border-foreground"
        placeholder="환자이름, 환자번호로 검색해주세요"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ScrollArea className="h-[440px] pt-1">
        {noResult ? (
          <NoResult setActiveTab={setActiveTab} />
        ) : (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">번호</TableHead>
                <TableHead className="text-center">이름</TableHead>
                <TableHead className="text-center">종</TableHead>
                <TableHead className="text-center">품종</TableHead>
                <TableHead className="text-center">성별</TableHead>
                <TableHead className="text-center">출생일</TableHead>
                <TableHead className="text-center">자세히</TableHead>
                <TableHead className="text-center">선택</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPets.map((pet) => (
                <TableRow key={pet.pet_id}>
                  <TableCell className="text-center text-xs">
                    {pet.hos_pet_id}
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    {pet.name}
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
                    <EditPetDialog pet={pet} setDialogOpen={setDialogOpen} />
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    <Button
                      className="px-2 py-0.5 h-6"
                      size="sm"
                      onClick={() => {
                        setSelectedPet(pet);
                        setDialogOpen(false);
                      }}
                    >
                      선택
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </ScrollArea>
    </div>
  );
}
