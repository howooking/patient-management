import { Button } from "@/components/ui/button";
import { FaRegStickyNote } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import PetDialog from "./pet-dialog";
import SelectedPet from "./selected-pet";

export default function TopBar() {
  return (
    <nav className=" bg-background shadow-sm sticky top-0">
      <div className="flex justify-between items-center px-6 py-2">
        <div>
          <SelectedPet />
        </div>
        <div className="flex items-center gap-2">
          <PetDialog />

          <PetDialog search />

          <Button size="icon" variant="ghost" className="rounded-full">
            <FaRegStickyNote size={20} />
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full">
            <FaRegBell size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
