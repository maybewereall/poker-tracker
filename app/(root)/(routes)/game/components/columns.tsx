"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';
import { Check, CheckCheckIcon, CheckCircle, Ticket, XCircle } from "lucide-react";

export type GameColumn = {
  id: number;
  date: string;
  buy_ins: number;
  cash_outs: number;
  rake: number;
  result: number;
  active: boolean;
}

export const columns: ColumnDef<GameColumn>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
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
    header: "Completed",
    cell: ({ row }) => row.original.active ? <XCircle className="text-red-700" /> : <CheckCircle className="text-green-700" />
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
