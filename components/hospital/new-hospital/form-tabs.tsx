"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HospitalSearchTab from "./hospital-search-tab";
import NewHospitalFormTab from "./new-hospital-form-tab";
import VirtualHospitalFormTab from "./virtual-hospital-form-tab";

export default function FormTabs({ query }: { query: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(query);

  useEffect(() => {
    router.replace(activeTab);
  }, [activeTab, router]);

  return (
    <section className="w-1/2 p-6 overflow-y-auto">
      <h2 className="text-2xl mb-2">병원 추가</h2>
      <Tabs
        defaultValue="search"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full gap-2">
          <TabsTrigger className="w-full" value="search">
            병원검색
          </TabsTrigger>
          <TabsTrigger className="w-full" value="real">
            병원등록
          </TabsTrigger>
          <TabsTrigger className="w-full" value="virtual">
            가상병원등록
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <HospitalSearchTab />
        </TabsContent>

        <TabsContent value="real">
          <NewHospitalFormTab />
        </TabsContent>

        <TabsContent value="virtual">
          <VirtualHospitalFormTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
