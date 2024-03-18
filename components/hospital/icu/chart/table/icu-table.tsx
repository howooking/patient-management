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
  // const checklist = useMemo(
  //   () =>
  //     selectedChartTx?.filter((element) => element.data_type === "checklist"),
  //   [selectedChartTx]
  // );

  // const feeds = useMemo(
  //   () => selectedChartTx?.filter((element) => element.data_type === "feed"),
  //   [selectedChartTx]
  // );

  // const elseTx = useMemo(
  //   () =>
  //     selectedChartTx?.filter(
  //       (element) =>
  //         element.data_type !== "checklist" && element.data_type !== "feed"
  //     ),
  //   [selectedChartTx]
  // );

  return (
    <div className="h-screen">
      <Table className="border-2">
        <TableHeader>
          <TableRow className="divide-x">
            <TableHead className="w-[240px] h-2 text-center">
              처치 목록
            </TableHead>
            {TIME.map((time) => (
              <TableHead className="h-2 text-center" key={time}>
                {time}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedChartTx?.map((element) => (
            <TableRow className="divide-x" key={element.icu_chart_tx_id}>
              <IcuTableCellTitle chartTx={element} />
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
