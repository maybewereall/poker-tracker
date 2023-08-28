"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';
import { PlayerStatistics } from "@prisma/client";
import { cn, colorByValue } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PlayerColumn = {
    player_id: Number;
    full_name: string;
    total_games: number | 0;
    total_buy_in: number | 0;
    total_cash_out: number | 0;
    profit: number | 0;
}

export const columns: ColumnDef<PlayerColumn>[] = [
  {
    accessorKey: "player_id",
    header: "ID",
  },
  {
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "total_games",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Games
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("total_games")}</div>
  },
  {
    accessorKey: "total_buy_in",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Buy Ins
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("total_buy_in")}</div>
  },
  {
    accessorKey: "total_cash_out",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cash out
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("total_cash_out")}</div>
  },
  {
    accessorKey: "profit",
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
    cell: ({ row }) => <div className={cn("font-bold text-center", colorByValue(row.getValue("profit")))}>{row.getValue("profit")}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
