"use client";

import React from "react";

import { useSelectedPet } from "@/lib/store/pets";
import EditPetDialog from "./pet-dialog/edit-pet-dialog";

export default function SelectedPet() {
  const { selectedPet } = useSelectedPet();

  if (!selectedPet) {
    return;
  }
  return <EditPetDialog selectedPetDialog pet={selectedPet} />;
}
