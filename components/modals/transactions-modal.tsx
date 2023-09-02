import { TransactionType } from "@/types/types";
import LoadingIcon from "@/components/ui/loading-icon";
import { ArrowRight } from "lucide-react";

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
            <div className="transaction-modal">
                
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">From</TableHead>
                        <TableHead className="w-[80px] text-center"></TableHead>
                        <TableHead className="text-left">To</TableHead>
                        <TableHead className="text-right w-[120px]">Amount (RM)</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {transactionData?.map((item, index) => {
                        return(
                            <TableRow key={index}>
                                <TableCell>{item.from}</TableCell>
                                <TableCell className="text-center w-[80px]"><ArrowRight /></TableCell>
                                <TableCell>{item.to}</TableCell>
                                <TableCell className="font-bold text-xl text-right w-[120px]">RM {item.amount}</TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </div>
        )
        
    );
}

export default TransactionsModal;