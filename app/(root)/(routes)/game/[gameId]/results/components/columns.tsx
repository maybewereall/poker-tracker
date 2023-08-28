"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';

export type GameResultColumn = {
  player: string;
  buy_in: number;
  cash_out: number;
  result: number;
}

export const columns: ColumnDef<GameResultColumn>[] = [
  {
    accessorKey: "player",
    header: "Player",
  },
  {
    accessorKey: "buy_in",
    header: "Buy Ins",
  },
  {
    accessorKey: "cash_out",
    header: "Cash Outs",
  },
  {
    accessorKey: "result",
    header: "Final"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
