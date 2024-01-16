"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export function DrugSettingSelect() {
  const [selectSetting, setSelectedSetting] = useState("drug");

  return (
    <RadioGroup
      defaultValue="drug"
      className="flex gap-2"
      onValueChange={setSelectedSetting}
      value={selectSetting}
    >
      <div className="flex items-center space-x-1">
        <RadioGroupItem value="drug" id="r2" />
        <Label htmlFor="r2">약물</Label>
      </div>
      <div className="flex items-center space-x-1">
        <RadioGroupItem value="product" id="r3" />
        <Label htmlFor="r3">제품</Label>
      </div>
    </RadioGroup>
  );
}
