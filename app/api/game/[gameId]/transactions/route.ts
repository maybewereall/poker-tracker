import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

type TransactionType = ({
    from: string,
    to: string,
    amount: number
})

export async function GET(
    req: Request,
    { params }: { params: { gameId: string } }
) {
    const gameId = Number(params.gameId);

    const game = await prismadb.games.findUnique({
        where: { game_id: gameId },
        include: {
            gameParticipants: {
                include: {
                    buy_in: true,
                    player: true
                }
            },
        },
    });

    const balances = game?.gameParticipants.map(participant => {
        return {
            player_name: participant.player.full_name,
            participantId: participant.participant_id,
            balance: participant.cash_out_amount - participant.buy_in.reduce((total, buyIn) => total + Number(buyIn.amount), 0),
        };
    });

    const debtors = balances?.filter(participant => participant.balance < 0);
    const creditors = balances?.filter(participant => participant.balance > 0);

    let transactions: TransactionType[] = [];

    debtors?.forEach(debtor => {
        creditors?.forEach(creditor => {
            if (debtor.balance < 0 && creditor.balance > 0) {
                const payment = Math.min(creditor.balance, -debtor.balance);

                transactions.push({
                    from: debtor.player_name,
                    to: creditor.player_name,
                    amount: payment,
                });

                debtor.balance += payment;
                creditor.balance -= payment;
            }
        });
    });
    console.log({transactions});
    return NextResponse.json(transactions);
}