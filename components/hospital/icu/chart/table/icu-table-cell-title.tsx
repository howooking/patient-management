import { TableCell } from "@/components/ui/table";
import { type IcuChartTxJoined } from "@/types/type";
import IcuChartTxEditDialog from "./icu-chart-tx-edit-dialog";

export default function IcuTableCellTitle({
  chartTx,
}: {
  chartTx: IcuChartTxJoined;
}) {
  return (
    <TableCell className="leading-4 relative">
      <span className="text-black mr-1">{chartTx.todo_name}</span>
      <span className="text-[8px] text-gray-500">{chartTx.todo_memo}</span>
      <IcuChartTxEditDialog chartTx={chartTx} />
    </TableCell>
  );
}
