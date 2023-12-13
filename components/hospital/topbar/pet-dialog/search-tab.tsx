"use client";

import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function SearchTab({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    console.log(`Searching... ${searchTerm}`);
  }, 300);

  return (
    <div>
      <Input
        placeholder="환자이름, 환자번호로 검색해주세요"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">이름</TableHead>
            <TableHead className="text-center">번호</TableHead>
            <TableHead className="text-center">종</TableHead>
            <TableHead className="text-center">품종</TableHead>
            <TableHead className="text-center">성별</TableHead>
            <TableHead className="text-center">출생일</TableHead>
            <TableHead className="text-center">자세히</TableHead>
            <TableHead className="text-center">선택</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center text-xs">이호우쓰</TableCell>
            <TableCell className="text-center text-xs">123456789</TableCell>
            <TableCell className="text-center text-xs">Feline</TableCell>
            <TableCell className="text-center text-xs">
              Australian Stumpy Tail Cattle Dog
            </TableCell>
            <TableCell className="text-center text-xs">SF</TableCell>
            <TableCell className="text-center text-xs">2018-06-03</TableCell>
            <TableCell className="text-center text-xs">
              <Button size="sm" variant="outline">
                선택
              </Button>
            </TableCell>
            <TableCell className="text-center text-xs">
              <Button size="sm">선택</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center text-xs">이호우쓰</TableCell>
            <TableCell className="text-center text-xs">123456789</TableCell>
            <TableCell className="text-center text-xs">Feline</TableCell>
            <TableCell className="text-center text-xs">
              Australian Stumpy Tail Cattle Dog
            </TableCell>
            <TableCell className="text-center text-xs">SF</TableCell>
            <TableCell className="text-center text-xs">2018-06-03</TableCell>
            <TableCell className="text-center text-xs">
              <Button size="sm" variant="outline">
                선택
              </Button>
            </TableCell>
            <TableCell className="text-center text-xs">
              <Button size="sm">선택</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center text-xs">이호우쓰</TableCell>
            <TableCell className="text-center text-xs">123456789</TableCell>
            <TableCell className="text-center text-xs">Feline</TableCell>
            <TableCell className="text-center text-xs">
              Australian Stumpy Tail Cattle Dog
            </TableCell>
            <TableCell className="text-center text-xs">SF</TableCell>
            <TableCell className="text-center text-xs">2018-06-03</TableCell>
            <TableCell className="text-center text-xs">
              <Button size="sm" variant="outline">
                선택
              </Button>
            </TableCell>
            <TableCell className="text-center text-xs">
              <Button size="sm">선택</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
