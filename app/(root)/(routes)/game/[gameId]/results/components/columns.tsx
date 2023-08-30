"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import { cn, colorByValue } from "@/lib/utils";

export type PlayerResultColumn = {
  player: string;
  buy_in: number;
  cash_out: number;
  result: number;
}
export type GameResultColumn = {
  game_id: number;
  buy_ins: number;
  cash_outs: number;
  rake: number;
  result: number;
}

export const playerColumns: ColumnDef<PlayerResultColumn>[] = [
  {
    accessorKey: "player",
    header: () => <div className="font-bold text-xl">Player</div>,
    cell: ({ row }) => <div className="font-bold text-lg text-muted-foreground">{row.getValue("player")}</div>
  },
  {
    accessorKey: "buy_in",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Buy In
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      )
    },
  },
  {
    accessorKey: "cash_out",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cash Out
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      )
    },
  },
  {
    accessorKey: "result",
    cell: ({ row }) => <div className={cn("font-bold", colorByValue(row.getValue("result")))}>{row.getValue("result")}</div>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profit
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

export const gameColumns: ColumnDef<GameResultColumn>[] = [
  {
    accessorKey: 'gameId',
    header: () => "ID"
  },
  {
    accessorKey: 'buyIns',
    header: () => "Buy Ins"
  },
  {
    accessorKey: 'cashOuts',
    header: () => "Cash Outs"
  },
  {
    accessorKey: 'rake',
    header: () => "Rake"
  },
  {
    accessorKey: 'finalResult',
    header: () => "Final"
  }
]