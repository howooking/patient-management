"use client";

import { Button } from "@/components/ui/button";
import avatarDefault from "@/public/default-avatar.jpg";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { LuArrowDown } from "react-icons/lu";
import ApproveColumn from "./approve-column";
import GroupColumn from "./group-column";
import GroupSetting from "./group-setting";
import { NicknameColumn } from "./nickname-column";
import PositionColumn from "./position-column";
import PositionSetting from "./position-setting";
import RankColumn from "./rank-column";

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
    cell: ({ row }) => {
      const rank = row.original.rank;
      const vet_id = row.original.vet_id;
      return <RankColumn rank={rank} vetId={vet_id} />;
    },
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
    header: ({ column, table }) => {
      const groupList = table.getRow("0").original.hospitals?.group_list;

      return (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            className="text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            그룹
            <LuArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <GroupSetting groupList={groupList ?? []} />
        </div>
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
    header: ({ column, table }) => {
      const positionList = table.getRow("0").original.hospitals?.position_list;
      return (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            className="text-sm"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            직급
            <LuArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <PositionSetting positionList={positionList ?? []} />
        </div>
      );
    },
    cell: ({ row }) => {
      const position = row.original.position;
      const positionList = row.original.hospitals?.position_list;
      const vet_id = row.original.vet_id;
      return (
        <PositionColumn
          position={position}
          positionList={positionList ?? []}
          vetId={vet_id}
        />
      );
    },
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
];
