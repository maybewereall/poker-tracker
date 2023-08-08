"use client";

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
import { Button } from "@/components/ui/button";

import { cn, colorByValue } from "@/lib/utils";

import { GameResultColumn, PlayerResultColumn, playerColumns } from "./columns";

interface IGameResultClientProps {
    playerData: PlayerResultColumn[];
    gameData: GameResultColumn;
    showTransactions: () => void;
}

const GameResultClient: React.FC<IGameResultClientProps> = ({
    playerData,
    gameData,
    showTransactions
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Game Results`}
                />
                 <div><Button onClick={showTransactions}>View Transactions</Button></div>
            </div>
            <Separator /> 

            <Table className="mb-4">
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
                        <TableCell><span className={cn("font-bold", colorByValue(gameData.result))}>RM {gameData.result}</span></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="flex items-center justify-between">
            <Heading
                    title={`Player Results`}
                />
            </div>
            <Separator />
            <DataTable columns={playerColumns} data={playerData} searchKey="player" />
            
        </>
    );
};

export default GameResultClient;
