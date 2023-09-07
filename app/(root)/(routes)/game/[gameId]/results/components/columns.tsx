"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import { cn, colorByValue, formatNumber } from "@/lib/utils";

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
    cell: ({ row }) => <div>{formatNumber(row.getValue("buy_in"))}</div>,
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
    cell: ({ row }) => <div>{formatNumber(row.getValue("cash_out"))}</div>,
  },
  {
    accessorKey: "result",
    cell: ({ row }) => <div className="font-bold">{formatNumber(row.getValue("result"), true)}</div>,
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
    header: () => "Buy Ins",
    cell: ({ row }) => <div>{formatNumber(row.getValue("buyIns"))}</div>
  },
  {
    accessorKey: 'cashOuts',
    header: () => "Cash Outs",
    cell: ({ row }) => <div>{formatNumber(row.getValue("cashOuts"))}</div>
  },
  {
    accessorKey: 'rake',
    header: () => "Rake",
    cell: ({ row }) => <div>{formatNumber(row.getValue("rake"))}</div>
  },
  {
    accessorKey: 'finalResult',
    header: () => "Final",
    cell: ({ row }) => <div>{formatNumber(row.getValue("finalResult"), true)}</div>
  }
]