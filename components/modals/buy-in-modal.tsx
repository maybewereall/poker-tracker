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

interface ITopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data:{
    participant_id: number,
    amount: string,
    timestamp: number
  }) => void;
  loading: boolean;
  playerName: string;
  participantId: number;
}

const formSchema = z.object({
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)))
});

const BuyInModal: React.FunctionComponent<ITopUpModalProps> = ({
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
      amount: "300",
    },
  });

  const handleModalSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      participant_id: participantId,
      timestamp: Date.now(),
      ...data
    });
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
      <Form {...form} >
      <form onSubmit={form.handleSubmit(handleModalSubmit)}>
          <FormField
            name="amount"
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
            <Button variant="outline" type="button" disabled={loading} onClick={onClose}>Cancel</Button>
            <Button variant="default" type="submit" disabled={loading}>Confirm</Button>
          </div>
          </form>
      </Form>
    </Modal>
  );
};

export default BuyInModal;
