"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';

export type GameColumn = {
  date: string;
  buy_ins: number;
  cash_outs: number;
  rake: number;
  result: number;
  active: boolean;
}

export const columns: ColumnDef<GameColumn>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "buy_ins",
    header: "Buy Ins",
  },
  {
    accessorKey: "cash_outs",
    header: "Cash Outs",
  },
  {
    accessorKey: "rake",
    header: "Rake",
  },
  {
    accessorKey: "result",
    header: "Final"
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
