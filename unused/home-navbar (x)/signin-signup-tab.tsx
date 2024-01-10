"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupTab from "../../components/signin/signup-tab";

export default function SigninSignupTab({ signin }: { signin?: boolean }) {
  const [activeTab, setActiveTab] = useState(signin ? "signin" : "signup");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full absolute left-0 -top-14 bg-background space-x-2">
        <TabsTrigger value="signin" className="w-full">
          로그인
        </TabsTrigger>
        <TabsTrigger value="signup" className="w-full">
          회원가입
        </TabsTrigger>
      </TabsList>

      <TabsContent value="signin" className="mt-0 space-y-6">
        {/* <SigninTab setActiveTab={setActiveTab} /> */}
      </TabsContent>

      <TabsContent value="signup" className="mt-0 space-y-6">
        <SignupTab setActiveTab={setActiveTab} />
      </TabsContent>
    </Tabs>
  );
}
