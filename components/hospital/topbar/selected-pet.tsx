"use client";

import React from "react";
import { PiCat, PiDog } from "react-icons/pi";

import { useSelectedPet } from "@/lib/store/pets";
import calculateAge from "@/lib/helper-function/pet-age";

export default function SelectedPet() {
  const { selectedPet } = useSelectedPet();

  if (!selectedPet) {
    return;
  }
  return (
    <div className="flex items-center gap-3 px-2 py-1 rounded-md border-2 text-xs">
      <div className="flex items-center gap-1">
        {selectedPet.species === "canine" ? (
          <PiDog size={20} />
        ) : (
          <PiCat size={20} />
        )}
        <span>{selectedPet.name}</span>
      </div>
      <span>{selectedPet.breed}</span>
      <span>{selectedPet.gender.toUpperCase()}</span>
      <span>{calculateAge(selectedPet?.birth)}</span>
    </div>
  );
}
