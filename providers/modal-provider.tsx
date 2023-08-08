"use client";

import {useEffect, useState} from 'react';

import { PlayerModal } from '@/components/modals/add-player-modal';

export const ModalProvider = () => {
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
        setisMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

    return (
        <>
            <PlayerModal />
        </>
    )
}