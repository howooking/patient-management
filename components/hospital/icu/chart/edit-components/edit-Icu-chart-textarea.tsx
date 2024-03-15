import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function EditIcuChartTextarea({
  text,
}: {
  text?: string | null;
}) {
  const [input, setInput] = useState(text ?? "");

  return (
    <Textarea
      rows={10}
      value={input}
      onChange={(event) => setInput(event.target.value)}
      className="w-full mt-1 p-1 text-xs"
    />
  );
}
