import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export default function GroupSelect({
  group,
  setGroup,
  groupOptions,
}: {
  group: string;
  setGroup: Dispatch<SetStateAction<string>>;
  groupOptions: string[];
}) {
  return (
    <Select value={group} onValueChange={setGroup} defaultValue="모두">
      <SelectTrigger className="text-xs h-6 w-20">
        <SelectValue placeholder="그룹" />
      </SelectTrigger>
      <SelectContent>
        {["모두", ...groupOptions].map((element) => (
          <SelectItem value={element} key={element}>
            {element}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
