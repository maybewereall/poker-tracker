'use server'

import z from 'zod';
import { auth, clerkClient } from '@clerk/nextjs/server'
import { toast } from "react-hot-toast";

import { formSchema } from '@/components/forms/link-account';
import axios from 'axios';

export const completeOnboarding = async (values: z.infer<typeof formSchema>) => {

  try {
    // setLoading(true);
    const response = await axios.post(`/api/players/onboarding`, {
      selected_player_id: values.selected_player_id,
      loggedIn_email: values.loggedIn_email
    });
    toast.success("Player Onboarded");
    // router.push(`/game/${response.data.game_id}`);
    // setLoading(false);

  } catch (error) {
    toast.error("Something went wrong.")
    // setLoading(false);
  }
}