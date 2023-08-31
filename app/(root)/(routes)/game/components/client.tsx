"use client";

import * as z from 'zod';
import { useState } from 'react';
import { Plus } from "lucide-react";
import toast from 'react-hot-toast';
import axios from 'axios';

import NewPlayerForm, { formSchema } from "@/components/forms/new-player";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import LoadingIcon from '@/components/ui/loading-icon';
import { Modal } from "@/components/ui/modal";

import { useLoading } from "@/hooks/use-loading";

import { GameColumn, columns } from "./columns";

interface IPlayerClientProps {
    data: GameColumn[];
}

const PlayerClient: React.FC<IPlayerClientProps> = ({
    data
}) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Games (${data.length})`}
                />
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="id" />
        </>
    );
};

export default PlayerClient;
