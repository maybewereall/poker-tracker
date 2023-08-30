import { TransactionType } from "@/types/types";
import LoadingIcon from "@/components/ui/loading-icon";
import { ArrowRightFromLine } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

interface ITransactionsModalProps {
    loading: boolean;
    transactionData: TransactionType[] | undefined;
}

const TransactionsModal: React.FC<ITransactionsModalProps> = ({
    loading,
    transactionData
}) => {

    return (
        loading ? (<LoadingIcon />) : (
            <Table style={{tableLayout: 'fixed', width: "100%"}}>
                <TableHeader>
                <TableRow>
                    <TableHead className="text-left">From</TableHead>
                    <TableHead className="w-[140px]"></TableHead>
                    <TableHead className="text-left">To</TableHead>
                    <TableHead className="text-left">Amount (RM)</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {transactionData?.map((item) => {
                    return(
                        <TableRow>
                            <TableCell>{item.from}</TableCell>
                            <TableCell className="text-center w-[140px]"><ArrowRightFromLine /></TableCell>
                            <TableCell>{item.to}</TableCell>
                            <TableCell>{item.amount}</TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        )
        
    );
}

export default TransactionsModal;