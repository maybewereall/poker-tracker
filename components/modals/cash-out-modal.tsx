"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "@/components/ui/form";

interface ICashOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data:{
    participant_id: number,
    amount: string,
  }) => void;
  loading: boolean;
  playerName: string;
  participantId: number;
}

const formSchema = z.object({
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
});

const CashOutModal: React.FunctionComponent<ICashOutModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  playerName,
  participantId,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        amount: "0",
    },
  });
  const handleModalSubmit = async (data: { amount: string }) => {
    onSubmit({
      participant_id: participantId,
      ...data
    });
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
		<form onSubmit={form.handleSubmit(handleModalSubmit)}>
		<FormField
		  name="amount"
		  control={form.control}
		  render={({ field }) => (
			<FormItem>
			  <FormLabel>Final chip count</FormLabel>
			  <FormControl>
				<Input
				  disabled={loading}
				  type="number"
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
