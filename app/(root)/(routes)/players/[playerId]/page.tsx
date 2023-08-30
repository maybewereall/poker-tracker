"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GameParticipants, PlayerStatistics, BuyIn } from "@prisma/client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn, colorByValue } from "@/lib/utils";

interface IPlayersGamePageProps {
}
type PlayerStatsType = (GameParticipants & { buy_in: BuyIn[] })[];

const PlayersGamePage: React.FunctionComponent<IPlayersGamePageProps> = (props) => {
    const params = useParams();
    const [playerStats, setPlayerStats] = useState<PlayerStatistics>();
    const [gameStats, setGameStats] = useState<PlayerStatsType>();
    let playerProfit: number = 0;

    const calcBuyIn = (buy_ins: BuyIn[]) => {
        return buy_ins.reduce((total, buy_in) => total + Number(buy_in.amount), 0);
    }
    useEffect(() => {
        const fetchStats = async () => {
            const stats = await axios.get(`/api/players/${params.playerId}`);
            setPlayerStats(stats.data.playerStats);
            setGameStats(stats.data.gameStats);
            playerProfit = playerStats ? (playerStats.total_cash_outs - playerStats.total_buy_ins) : 0;
            console.log(stats.data);
        }
        fetchStats();
    }, [])
    return (
        <div className="flex-col w-full max-w-[1200px] mx-auto">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
            <Heading
                    title={`Player Stats`}
                />
            </div>
            <Separator /> 

            <Table className="mb-4">
                <TableHeader>
                    <TableRow>
                    <TableHead>No. Games</TableHead>
                    <TableHead>Buy Ins</TableHead>
                    <TableHead>Cash Outs</TableHead>
                    <TableHead className="text-right">Final</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {playerStats && (
                        <TableRow>
                            <TableCell>{playerStats?.total_games_played}</TableCell>
                            <TableCell>RM {playerStats?.total_buy_ins}</TableCell>
                            <TableCell>RM {playerStats?.total_cash_outs}</TableCell>
                            <TableCell className="text-right">{playerStats && (<span className={cn("font-bold", colorByValue(playerStats.total_cash_outs - playerStats.total_buy_ins))}>RM {playerStats.total_cash_outs - playerStats.total_buy_ins}</span>)}</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
            </Table>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Game Stats`}
                />
            </div>
            <Separator />
            <Table className="mb-4">
                <TableHeader>
                    <TableRow>
                    <TableHead>Game ID</TableHead>
                    <TableHead>Buy Ins</TableHead>
                    <TableHead>Cash Out</TableHead>
                    <TableHead className="text-right">Final</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {gameStats && 
                        gameStats.map((item) => {
                            return (
                                <TableRow key={item.participant_id}>
                                    <TableCell>{item.game_id}</TableCell>
                                    <TableCell>RM {calcBuyIn(item.buy_in)}</TableCell>
                                    <TableCell>RM {item.cash_out_amount}</TableCell>
                                    <TableCell className="text-right">{playerStats && (<span className={cn("font-bold", colorByValue(item.cash_out_amount - calcBuyIn(item.buy_in)))}>RM {item.cash_out_amount - calcBuyIn(item.buy_in)}</span>)}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            </div>
            </div>
    );
};

export default PlayersGamePage;
