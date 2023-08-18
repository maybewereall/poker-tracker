"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface ITopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  playerName: string;
  playerId: Number;
  participantId: Number;
}

const formSchema = z.object({
  top_up: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
});

const TopUpModal: React.FunctionComponent<ITopUpModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  playerName,
  playerId,
  participantId,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      top_up: "300",
    },
  });
  const params = useParams();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
	const data = {
		participant_id: participantId,
		amount: parseInt(values.top_up),
		timestamp: Date.now()
	}
	try {
		const response = await axios.patch(`/api/game/${params.gameId}/top-up/${playerId}`, {...data});
		console.log("topped up", response);
		toast.success("Topped up!")
	} catch(error) {
		console.log(error);
		toast.error("Something went wrong.")
	}
  }
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title={`Top up ${playerName}`}
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)}>
		<FormField
		  name="top_up"
		  control={form.control}
		  render={({ field }) => (
			<FormItem>
			  <FormLabel>Top up</FormLabel>
			  <FormControl>
				<Input
				  disabled={loading}
				  type="text"
				  placeholder="Top up amount"
				  {...field}
				/>
			  </FormControl>
			  <FormMessage />
			</FormItem>
		  )}
		/>
		<div className="flex justify-between mt-4">
			<Button variant="outline" onClick={onClose}>Cancel</Button>
			<Button variant="default" type="submit">Confirm</Button>
		</div>
	  </form>
	  </Form>
    </Modal>
  );
};

export default TopUpModal;
