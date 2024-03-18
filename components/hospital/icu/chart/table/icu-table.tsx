import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type IcuChartTxJoined } from "@/types/type";
import IcuTableCellInput from "./Icu-table-cell-input";
import IcuTableCellTitle from "./icu-table-cell-title";
import { TIME } from "@/constants/time";
import { useMemo } from "react";

export default function IcuTable({
  selectedChartTx,
}: {
  selectedChartTx?: IcuChartTxJoined[];
}) {
  const sortedChartTx = useMemo(() => {
    const dataTypeOrder = ["checklist", "manual", "injection", "feed"];
    return selectedChartTx?.sort(
      (a, b) =>
        dataTypeOrder.indexOf(a.data_type) - dataTypeOrder.indexOf(b.data_type)
    );
  }, [selectedChartTx]);

  return (
    <div className="h-screen">
      <Table className="border-2">
        <TableHeader>
          <TableRow className="divide-x">
            <TableHead className="w-[220px] h-2 text-center">
              처치 목록
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
              <IcuTableCellTitle
                chartTx={element}
                dataType={element.data_type}
              />
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

          {/* icu_chart_tx 처치 추가 */}
          {/* <TableRow>
            <IcuTableCellTitle todoName="투두" todoMemo="메모" />
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}
