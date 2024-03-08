import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pet } from "@/types/type";

export default function IcuTable({
  io_id,
  pets,
}: {
  io_id: number;
  pets: Pet | null;
}) {
  return (
    <div className="min-h-screen pt-14" id={`${io_id}`}>
      <div className="flex gap-10">
        <p>{pets?.name}</p>
        <p>{pets?.birth}</p>
        <p>{pets?.breed}</p>
        <p>{pets?.gender}</p>
        <p>{pets?.species}</p>
      </div>
      <Table className="border-2">
        <TableHeader>
          <TableRow className="divide-x-2">
            <TableHead className="w-[160px]">처치 목록</TableHead>
            <TableHead>01</TableHead>
            <TableHead>02</TableHead>
            <TableHead>03</TableHead>
            <TableHead>04</TableHead>
            <TableHead>05</TableHead>
            <TableHead>06</TableHead>
            <TableHead>07</TableHead>
            <TableHead>08</TableHead>
            <TableHead>09</TableHead>
            <TableHead>10</TableHead>
            <TableHead>11</TableHead>
            <TableHead>12</TableHead>
            <TableHead>13</TableHead>
            <TableHead>14</TableHead>
            <TableHead>15</TableHead>
            <TableHead>16</TableHead>
            <TableHead>17</TableHead>
            <TableHead>18</TableHead>
            <TableHead>19</TableHead>
            <TableHead>20</TableHead>
            <TableHead>21</TableHead>
            <TableHead>22</TableHead>
            <TableHead>23</TableHead>
            <TableHead>24</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="divide-x-2">
            <TableCell className="font-medium">처치1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell></TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell></TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell></TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
