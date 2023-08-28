"use client";

import toast from 'react-hot-toast';
import axios from 'axios';

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";


import { GameResultColumn, columns } from "./columns";

interface IGameResultClientProps {
    data: GameResultColumn[];
}

const GameResultClient: React.FC<IGameResultClientProps> = ({
    data
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Game Results`}
                />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="player" />
        </>
    );
};

export default GameResultClient;
