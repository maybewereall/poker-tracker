"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';

import { cn, colorByValue, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
    accessorKey: "full_name",
    header: "Name",
  },
  {
    accessorKey: "total_games",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Games
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("total_games")}</div>
  },
  {
    accessorKey: "total_buy_in",
    header: ({ column }) => {
      return (
          <div className="text-center">
            <Button
              variant="ghost"
              className=" text-center"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Buy Ins
              <ArrowUpDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("total_buy_in")}</div>,
    meta: {
      align: 'center'
    },
  },
  {
    accessorKey: "total_cash_out",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cash out
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{Number(row.getValue("total_cash_out")).toLocaleString()}</div>
  },
  {
    accessorKey: "profit",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Profit
            <ArrowUpDown className="ml-1 h-3 w-3" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="font-bold text-center">{formatNumber(row.getValue("profit"), true)}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
