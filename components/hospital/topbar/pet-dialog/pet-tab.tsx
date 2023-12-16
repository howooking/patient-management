"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddPetTab from "./add-pet-tab";
import SearchTab from "./search-tab";

type Props = {
  search?: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function PetTab({ search, setDialogOpen }: Props) {
  const [activeTab, setActiveTab] = useState(search ? "search" : "add");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
      <TabsList className="w-full absolute left-0 -top-14 bg-background flex gap-4">
        <TabsTrigger
          value="add"
          className="w-full data-[state=active]:font-semibold data-[state=active]:border-2"
        >
          환자 등록
        </TabsTrigger>
        <TabsTrigger
          value="search"
          className="w-full data-[state=active]:font-semibold data-[state=active]:border-2"
        >
          환자 검색
        </TabsTrigger>
      </TabsList>

      <TabsContent value="add" className="mt-0">
        <AddPetTab setDialogOpen={setDialogOpen} />
      </TabsContent>

      <TabsContent value="search" className="mt-0">
        <SearchTab setActiveTab={setActiveTab} setDialogOpen={setDialogOpen} />
      </TabsContent>
    </Tabs>
  );
}
