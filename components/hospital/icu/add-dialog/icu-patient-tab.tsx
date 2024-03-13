import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pet } from "@/types/type";
import { Dispatch, SetStateAction, useState } from "react";
import AddPetTab from "../../topbar/pet-dialog/add-pet-tab";
import SearchTab from "../../topbar/pet-dialog/search-tab";

export default function IcuPatientTab({
  search,
  setDialogOpen,
  pets,
}: {
  search?: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  pets: Pet[];
}) {
  const [activeTab, setActiveTab] = useState(search ? "search" : "add");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
      <TabsList className="w-full absolute left-0 -top-14 bg-muted flex gap-4">
        <TabsTrigger value="add" className="w-full">
          환자 등록
        </TabsTrigger>
        <TabsTrigger value="search" className="w-full">
          환자 검색
        </TabsTrigger>
      </TabsList>

      <TabsContent value="add" className="mt-0">
        <AddPetTab setDialogOpen={setDialogOpen} />
      </TabsContent>

      <TabsContent value="search" className="mt-0">
        <SearchTab
          setActiveTab={setActiveTab}
          setDialogOpen={setDialogOpen}
          pets={pets}
          icu
        />
      </TabsContent>
    </Tabs>
  );
}
