"use client";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PlayerColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal } from "lucide-react";

interface CellActionProps {
    data: PlayerColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("ID copied to the clipboard");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push(`/players/${data.player_id}`)}>
                    <Edit className="mr-2 h-4 w-4" />
                    View Stats
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCopy((data.player_id).toString())}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy ID
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}