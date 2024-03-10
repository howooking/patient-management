import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export default function FilterSelect({
  select,
  setSelect,
  options,
  placeholder,
}: {
  select: string;
  setSelect: Dispatch<SetStateAction<string>>;
  options: string[];
  placeholder: string;
}) {
  return (
    <Select value={select} onValueChange={setSelect} defaultValue="모두">
      <SelectTrigger className="text-xs h-6 w-20">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {[placeholder, ...options].map((element) => (
          <SelectItem value={element} key={element}>
            {element}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
