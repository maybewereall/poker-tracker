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
import { Modal } from "@/components/ui/modal";

import { useLoading } from "@/hooks/use-loading";

import { PlayerColumn, columns } from "./columns";

interface IPlayerClientProps {
    data: PlayerColumn[];
}

const PlayerClient: React.FC<IPlayerClientProps> = ({
    data
}) => {
    const [openNewPlayerModal, setOpenNewPlayerModal] = useState(false);
    const { loading, setLoading } = useLoading();

    const handleAddPlayer = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/players', {
                ...values
            });
            toast.success("Player added");
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong.")
            setLoading(false);
        } finally {
        }
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Players (${data.length})`}
                    
                />
                <Button onClick={() => setOpenNewPlayerModal(true)}><Plus className="mr-2 h-4 w-4" />Add new</Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="full_name" />

            <Modal title="Create Player" description="Add new player to the club" isOpen={openNewPlayerModal} onClose={() => setOpenNewPlayerModal(false)}>
                <NewPlayerForm
                    onSubmit={handleAddPlayer}
                    onCancel={() => setOpenNewPlayerModal(false)}
                    loading={loading}
                />
            </Modal>
        </>
    );
};

export default PlayerClient;
