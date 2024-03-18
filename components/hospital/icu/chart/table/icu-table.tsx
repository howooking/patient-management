import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TIME } from "@/constants/time";
import { type IcuChartTxJoined } from "@/types/type";
import { useMemo } from "react";
import IcuTableCellInput from "./Icu-table-cell-input";
import IcuTableCellTitle from "./icu-table-cell-title";
import IcuChartTxDialog from "./icu-chart-tx-edit-dialog";
import { useSelectedIcuChart } from "@/lib/store/selected-icu-chart";
import { useSelectedIcuIo } from "@/lib/store/selected-icu-io";

export default function IcuTable({
  selectedChartTx,
}: {
  selectedChartTx?: IcuChartTxJoined[];
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
            처치 목록{" "}
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
                hasTodo={element.todo[index] === "1"}
                key={time}
                time={index + 1}
                // @ts-ignore
                result={element[`done_${index + 1}`]?.result ?? ""}
                // @ts-ignore
                tx_id={element[`done_${index + 1}`]?.tx_id}
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
