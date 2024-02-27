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
import { useSelectedPet } from "@/lib/store/pets";
import type { Pet } from "@/types/type";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import EditPetDialog from "./edit-pet-dialog";
import NoResult from "./no-result";

type Props = {
  setActiveTab: Dispatch<SetStateAction<string>>;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  pets?: Pet[];
};

export default function SearchTab({
  setActiveTab,
  setDialogOpen,
  pets,
}: Props) {
  const { setSelectedPet } = useSelectedPet();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [filteredPets, setFilteredPets] = useState<Pet[]>(pets ?? []);
  const [noResult, setNoResult] = useState(false);

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    if (searchTerm === "") {
      setNoResult(false);
      setFilteredPets(pets ?? []);
      return;
    }

    const filtered = pets?.filter(
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
