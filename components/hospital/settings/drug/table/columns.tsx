"use client";

import { Button } from "@/components/ui/button";
import { type Drug } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { LuArrowDown } from "react-icons/lu";
import TableDropdown from "./table-dropdown";

export type DrugTableColumn = Omit<Drug, "created_at">;

export const columns: ColumnDef<DrugTableColumn>[] = [
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
          약품명
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
    accessorKey: "indication",
    header: "적용증",
  },

  {
    accessorKey: "description",
    header: "설명",
  },
  {
    accessorKey: "side_effect",
    header: "부작용",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const drug = row.original;

      return <TableDropdown drug={drug} />;
    },
  },
];
