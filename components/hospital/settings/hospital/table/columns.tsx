"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { LuArrowDown } from "react-icons/lu";
import Image from "next/image";
import avatarDefault from "@/public/default-avatar.jpg";
import ApproveColumn from "./approve-column";
import { NicknameColumn } from "./nickname-column";
import GroupColumn from "./group-column";

export type vetsTableColumn = {
  hospitals: {
    group_list: string[];
    position_list: string[];
  } | null;
  vets: {
    vet_name: string;
    avatar_url: string | null;
  } | null;
  vet_id: string;
  vet_approved: boolean;
  group: string;
  position: string;
  nickname: string | null;
  rank: number;
};

export const columns: ColumnDef<vetsTableColumn>[] = [
  {
    accessorKey: "rank",
    header: "서열",
  },
  {
    accessorKey: "vets",
    header: "수의사",
    cell: ({ row }) => {
      const vet = row.original.vets;

      return (
        <div className="flex gap-1 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="rounded-full"
            unoptimized
            alt="avatar"
            src={vet?.avatar_url ?? avatarDefault}
            width={30}
            height={30}
          />
          <p>{vet?.vet_name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "nickname",
    header: "닉네임",
    cell: ({ row }) => {
      const nickname = row.original.nickname;
      const vet_id = row.original.vet_id;

      return (
        <div className="flex items-center gap-2">
          <p>{nickname}</p>
          <NicknameColumn nickname={nickname ?? ""} vetId={vet_id} />
        </div>
      );
    },
  },
  {
    accessorKey: "group",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          className="text-sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          그룹
          <LuArrowDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const group = row.original.group;
      const groupList = row.original.hospitals?.group_list;
      const vet_id = row.original.vet_id;
      return (
        <GroupColumn group={group} groupList={groupList ?? []} vetId={vet_id} />
      );
    },
  },

  {
    accessorKey: "position",
    header: "직급",
  },
  {
    accessorKey: "vet_approved",
    header: "승인여부",
    cell: ({ row }) => {
      const vet_approved = row.original.vet_approved;
      const vet_id = row.original.vet_id;

      return (
        <div className=" text-center">
          <ApproveColumn approved={vet_approved} vetId={vet_id} />
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const feed = row.original;

  //     return <TableDropdown feed={feed} />;
  //   },
  // },
];
