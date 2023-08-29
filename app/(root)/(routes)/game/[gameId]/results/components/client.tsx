"use client";

import toast from 'react-hot-toast';
import axios from 'axios';

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { GameResultColumn, PlayerResultColumn, playerColumns } from "./columns";

interface IGameResultClientProps {
    playerData: PlayerResultColumn[];
    gameData: GameResultColumn;
}

const GameResultClient: React.FC<IGameResultClientProps> = ({
    playerData,
    gameData
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Game Results`}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Buy Ins</TableHead>
                    <TableHead>Cash Outs</TableHead>
                    <TableHead>Rake</TableHead>
                    <TableHead>Final</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{gameData.game_id}</TableCell>
                        <TableCell>RM {gameData.buy_ins}</TableCell>
                        <TableCell>RM {gameData.cash_outs}</TableCell>
                        <TableCell>RM {gameData.rake}</TableCell>
                        <TableCell>RM {gameData.result}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Separator />
            <Heading
                    title={`Player Results`}
                />
            <DataTable columns={playerColumns} data={playerData} searchKey="player" />
        </>
    );
};

export default GameResultClient;
