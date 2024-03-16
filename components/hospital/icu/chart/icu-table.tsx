import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type IcuChartTxJoined } from "@/types/type";
import IcuTableCellInput from "./Icu-table-cell-input";
import { useMemo } from "react";

const TIME = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

export default function IcuTable({
  selectedChartTx,
}: {
  selectedChartTx?: IcuChartTxJoined[];
}) {
  const checklist = useMemo(
    () =>
      selectedChartTx?.filter((element) => element.data_type === "checklist"),
    [selectedChartTx]
  );

  return (
    <div className="h-screen">
      <Table className="border-2">
        <TableHeader>
          <TableRow className="divide-x">
            <IcuTableHead className="w-[200px]">처치 목록</IcuTableHead>
            {TIME.map((time) => (
              <IcuTableHead key={time}>{time}</IcuTableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklist?.map((element) => (
            <TableRow className="divide-x" key={element.icu_chart_tx_id}>
              <IcuTableCell>
                <span className="text-black mr-1">{element.todo_name}</span>
                <span className="text-[8px] text-gray-500">
                  {element.todo_memo}
                </span>
              </IcuTableCell>

              {TIME.map((time, index) => (
                <IcuTableCellInput
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
          <TableRow>
            <IcuTableCell>
              <span className="text-black mr-1">처치이름</span>
              <span className="text-[8px] text-gray-500">메모</span>
            </IcuTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

const IcuTableHead = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <TableHead className={cn("h-2 text-center", className)}>{children}</TableHead>
);

const IcuTableCell = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <TableCell className={cn("p-1 h-2 leading-4", className)}>
    {children}
  </TableCell>
);
