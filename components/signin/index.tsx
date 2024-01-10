"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SigninTab from "./signin-tab";
import SignupTab from "./signup-tab";

export default function Signin() {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-1/2 p-20 space-y-10"
    >
      <TabsList className="w-full">
        <TabsTrigger value="signin" className="w-full">
          로그인
        </TabsTrigger>
        <TabsTrigger value="signup" className="w-full">
          회원가입
        </TabsTrigger>
      </TabsList>

      <TabsContent value="signin" className="mt-0 space-y-10">
        <SigninTab setActiveTab={setActiveTab} />
      </TabsContent>

      <TabsContent value="signup" className="mt-0 space-y-10">
        <SignupTab setActiveTab={setActiveTab} />
      </TabsContent>
    </Tabs>
  );
}
