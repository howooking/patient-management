import { TableCell } from "@/components/ui/table";
import { type IcuChartTxJoined } from "@/types/type";
import IcuChartTxDialog from "./icu-chart-tx-edit-dialog";
import { cn } from "@/lib/utils";

export default function IcuTableCellTitle({
  chartTx,
  dataType,
}: {
  chartTx: IcuChartTxJoined;
  dataType: string;
}) {
  return (
    <TableCell
      className={cn(
        "leading-4 relative",
        dataType === "checklist" && "bg-red-50", // checklist red-50
        dataType === "fluid" && "bg-blue-50", // fluid blue
        dataType === "feed" && "bg-green-50", // feed green
        dataType !== "checklist" && // etc yellow
          dataType !== "feed" &&
          dataType !== "fluid" &&
          "bg-yellow-50"
      )}
    >
      <span className="text-black mr-1">{chartTx.todo_name}</span>
      <span className="text-[8px] text-gray-500">{chartTx.todo_memo}</span>
      <IcuChartTxDialog chartTx={chartTx} edit />
    </TableCell>
  );
}
