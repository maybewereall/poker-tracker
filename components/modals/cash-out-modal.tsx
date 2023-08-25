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

interface ICashOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  playerName: string;
  playerId: Number;
  participantId: Number;
}

const formSchema = z.object({
    cash_out: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
});

const CashOutModal: React.FunctionComponent<ICashOutModalProps> = ({
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
        cash_out: "",
    },
  });
  const params = useParams();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
	const data = {
		participant_id: participantId,
		amount: parseInt(values.cash_out),
	}
	try {
		const response = await axios.patch(`/api/game/${params.gameId}/cash-out/${playerId}`, {...data});
		console.log("cash out", response);
		toast.success("Player cashed out!");
    onClose();
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
      title={`Cash Out ${playerName}`}
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)}>
		<FormField
		  name="cash_out"
		  control={form.control}
		  render={({ field }) => (
			<FormItem>
			  <FormLabel>Final chip count</FormLabel>
			  <FormControl>
				<Input
				  disabled={loading}
				  type="text"
				  placeholder="Final chip count"
				  {...field}
				/>
			  </FormControl>
			  <FormMessage />
			</FormItem>
		  )}
		/>
		<div className="flex justify-between mt-4">
			<Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
			<Button variant="destructive" type="submit">Confirm</Button>
		</div>
	  </form>
	  </Form>
    </Modal>
  );
};

export default CashOutModal;
