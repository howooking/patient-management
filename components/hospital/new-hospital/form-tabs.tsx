"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/common/logo";
import VirtualHospitalFormTab from "./virtual-hospital-form-tab";
import NewHospitalFormTab from "./new-hospital-form-tab";
import HospitalSearchTab from "./hospital-search-tab";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormTabs({ query }: { query: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(query);

  useEffect(() => {
    router.replace(activeTab);
  }, [activeTab, router]);

  return (
    <section className="w-1/2 p-6">
      <div className="flex items-center gap-2 mb-2">
        <Logo />
        <h2 className="text-2xl">병원 추가</h2>
      </div>
      <Tabs
        defaultValue="search"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="w-full">
          <TabsTrigger className="w-full" value="search">
            병원검색
          </TabsTrigger>
          <TabsTrigger className="w-full" value="real">
            병원추가
          </TabsTrigger>
          <TabsTrigger className="w-full" value="virtual">
            가상병원추가
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