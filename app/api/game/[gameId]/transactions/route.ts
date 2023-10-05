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
            gameStatistics: true
        },
    });

    const balances = game?.gameParticipants.map(participant => {
        return {
            player_name: participant.player.full_name,
            participantId: participant.participant_id,
            balance: participant.cash_out_amount - participant.buy_in.reduce((total, buyIn) => total + Number(buyIn.amount), 0),
        };
    }).concat({
        player_name: 'Rake',
        participantId: 0,
        balance: game.gameStatistics[0].rake
    });

    const debtors = balances?.filter(participant => participant.balance < 0);
    const creditors = balances?.filter(participant => participant.balance > 0);

    let transactions: TransactionType[] = [];

    debtors?.sort((a, b) => a.balance - b.balance);
    creditors?.sort((a, b) => a.balance - b.balance);

    let creditorsSafe = creditors || [];

    debtors?.forEach(debtor => {
        while (debtor.balance < 0 && creditorsSafe.length > 0) {
            let creditor = creditorsSafe[0];
            const payment = Math.min(creditor.balance, -debtor.balance);

            transactions.push({
                from: debtor.player_name,
                to: creditor.player_name,
                amount: payment,
            });

            debtor.balance += payment;
            creditor.balance -= payment;

            if (creditor.balance <= 0) {
                creditorsSafe.shift(); 
            }
        }
    });
    return NextResponse.json(transactions);
}