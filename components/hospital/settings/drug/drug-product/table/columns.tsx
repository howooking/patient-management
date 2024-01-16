"use client";

import { Button } from "@/components/ui/button";
import { type DrugProducts } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";
import { LuArrowDown } from "react-icons/lu";
import TableDropdown from "./table-dropdown";
export type DrugProductTableColumn = Omit<DrugProducts, "created_at">;

export const columns: ColumnDef<DrugProductTableColumn>[] = [
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
          제품명
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
    accessorKey: "type",
    header: "형태",
  },

  {
    accessorKey: "company",
    header: "제약회사",
  },
  {
    accessorKey: "mass_unit",
    header: "mass_unit",
  },
  {
    accessorKey: "description",
    header: "설명",
  },
  {
    accessorKey: "unit",
    header: "unit",
  },
  {
    accessorKey: "volume",
    header: "volume",
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
      const drugProduct = row.original;

      return <TableDropdown drugProduct={drugProduct} />;
    },
  },
];
