import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TIME } from "@/constants/time";
import { useSelectedIcuChart } from "@/lib/store/selected-icu-chart";
import { useSelectedIcuIo } from "@/lib/store/selected-icu-io";
import { type IcuChartTxJoined } from "@/types/type";
import { useMemo } from "react";
import IcuTableCellInput from "./Icu-table-cell-input";
import IcuChartTxDialog from "./icu-chart-tx-edit-dialog";
import IcuTableCellTitle from "./icu-table-cell-title";

export default function IcuTable({
  selectedChartTx,
  chartState,
}: {
  selectedChartTx?: IcuChartTxJoined[];
  chartState?: "past" | "today";
}) {
  const sortedChartTx = useMemo(() => {
    const dataTypeOrder = ["checklist", "fluid", "injection", "manual", "feed"];
    return selectedChartTx?.sort(
      (a, b) =>
        dataTypeOrder.indexOf(a.data_type) - dataTypeOrder.indexOf(b.data_type)
    );
  }, [selectedChartTx]);

  const { selectedIcuChartId } = useSelectedIcuChart();
  const { selectedIcuIoId } = useSelectedIcuIo();

  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="divide-x">
          <TableHead className="w-[220px] h-10 text-center">
            처치{" "}
            <IcuChartTxDialog
              io_id={selectedIcuIoId}
              icu_chart_id={selectedIcuChartId}
            />
          </TableHead>

          {TIME.map((time) => (
            <TableHead className="h-2 text-center" key={time}>
              {time.toString().padStart(2, "0")}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {sortedChartTx?.map((element) => (
          <TableRow className="divide-x" key={element.icu_chart_tx_id}>
            <IcuTableCellTitle chartTx={element} dataType={element.data_type} />

            {TIME.map((time, index) => (
              <IcuTableCellInput
                chartState={chartState}
                hasTodo={element.todo[index] === "1"}
                key={time}
                time={time}
                result={element[`done_${time}` as "done_1"]?.result ?? ""}
                tx_id={element[`done_${time}` as "done_1"]?.tx_id}
                icu_chart_tx_id={element.icu_chart_tx_id}
                io_id={element.io_id.io_id}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
