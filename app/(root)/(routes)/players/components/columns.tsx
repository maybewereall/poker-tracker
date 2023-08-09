"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PlayerColumn = {
    id: string;
    name: string;
    games: Number;
    createdAt: string;
}

export const columns: ColumnDef<PlayerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "games",
    header: "Games",
  },
  {
    accessorKey: "createdAt",
    header: "Created"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
