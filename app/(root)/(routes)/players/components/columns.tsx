"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from './cell-action';
import { PlayerStatistics } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PlayerColumn = {
    player_id: Number;
    full_name: string;
    email: string;
    playerStatistics: PlayerStatistics | null;
    date_joined: string;
    total_games: number;
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date_joined",
    header: "Date Joined"
  },
  {
    accessorKey: "total_games",
    header: "Games"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
