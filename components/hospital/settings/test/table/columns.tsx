"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Test } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { LuArrowDown } from "react-icons/lu";
import { MdMoreVert } from "react-icons/md";
import { EditTestDialog } from "./edit-test-dialog";
import { DeleteTestDialog } from "./delete-test-dialog";
export type TestTableColum = Omit<Test, "created_at">;

export const columns: ColumnDef<TestTableColum>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          className="text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          검사명
          <LuArrowDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          className="text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          카테고리
          <LuArrowDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "tag",
    header: "태그",
  },

  {
    accessorKey: "unit",
    header: "단위",
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const test = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full" size="icon">
              <span className="sr-only">Open menu</span>
              <MdMoreVert />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-2">
            <EditTestDialog test={test} copy />

            <EditTestDialog test={test} />

            <DeleteTestDialog test={test} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
