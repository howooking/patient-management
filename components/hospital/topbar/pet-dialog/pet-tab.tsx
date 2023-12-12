"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddPetTab from "./add-pet-tab";
import SearchTab from "./search-tab";

export default function Pettab({ search }: { search?: boolean }) {
  const [activeTab, setActiveTab] = useState(search ? "search" : "add");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full absolute left-0 -top-14 bg-background">
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

      <TabsContent value="add" className="mt-0 space-y-6">
        <AddPetTab setActiveTab={setActiveTab} />
      </TabsContent>

      <TabsContent value="search" className="mt-0 space-y-6">
        <SearchTab setActiveTab={setActiveTab} />
      </TabsContent>
    </Tabs>
  );
}
