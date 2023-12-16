"use client";

import React from "react";

import { useSelectedPet } from "@/lib/store/pets";
import SelectedPetDialog from "./selected-pet-dialog";

export default function SelectedPet() {
  const { selectedPet } = useSelectedPet();

  if (!selectedPet) {
    return;
  }
  return <SelectedPetDialog selectedPet={selectedPet} />;
}
