"use client";

import { Plus } from "lucide-react";

import { usePlayerModal } from "@/hooks/use-player-modal";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { PlayerColumn, columns } from "./columns";


interface IPlayerClientProps {
    data: PlayerColumn[];
}

const PlayerClient: React.FC<IPlayerClientProps> = ({
    data
}) => {
    const playerModal = usePlayerModal();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Players (${data.length})`}
                    
                />
                <Button onClick={() => playerModal.onOpen()}><Plus className="mr-2 h-4 w-4" />Add new</Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
        </>
    );
};

export default PlayerClient;
