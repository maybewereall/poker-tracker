"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';
import { cn, colorByValue } from "@/lib/utils";

export type GameResultColumn = {
  player: string;
  buy_in: number;
  cash_out: number;
  result: number;
}

export const columns: ColumnDef<GameResultColumn>[] = [
  {
    accessorKey: "player",
    header: () => <div className="font-bold text-xl">Player</div>,
    cell: ({ row }) => <div className="font-bold text-lg text-muted-foreground">{row.getValue("player")}</div>
  },
  {
    accessorKey: "buy_in",
    header: () => <div className="font-bold text-xl">Buy Ins</div>
  },
  {
    accessorKey: "cash_out",
    header: () => <div className="font-bold text-xl">Cash Outs</div>
  },
  {
    accessorKey: "result",
    header: () => <div className="font-bold text-xl">Profit</div>,
    cell: ({ row }) => <div className={cn("font-bold", colorByValue(row.getValue("result")))}>{row.getValue("result")}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
