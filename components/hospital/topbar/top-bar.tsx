import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { IoChatboxOutline, IoNotificationsOutline } from "react-icons/io5";
import PetDialog from "./pet-dialog/pet-dialog";
import SelectedPet from "./selected-pet";

export default async function TopBar({ hos_id }: { hos_id: string }) {
  const supabase = await createSupabaseServerClient(true);

  const { data: pets, error: petsError } = await supabase
    .from("pets")
    .select()
    .match({ hos_id });

  if (petsError) {
    throw new Error(petsError.message);
  }

  return (
    <nav className="bg-background border-b border-input sticky top-0 z-40">
      <div className="flex justify-between items-center px-6 py-2">
        <div>
          <SelectedPet />
        </div>

        <div className="flex items-center gap-2">
          <PetDialog pets={pets} />

          <PetDialog search pets={pets} />

          <Button size="icon" variant="ghost" className="rounded-full">
            <IoChatboxOutline size={20} />
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full">
            <IoNotificationsOutline size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
