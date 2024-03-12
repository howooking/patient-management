import IcuNavbar from "@/components/hospital/icu/navbar/icu-navbar";
import IcuSidebar from "@/components/hospital/icu/sidebar/icu-sidebar";
import React from "react";

export default function IcuLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { hos_id: string };
}) {
  return (
    <div>
      <IcuNavbar hos_id={params.hos_id} />

      <IcuSidebar />
      <main className="pl-36">{children}</main>
    </div>
  );
}
