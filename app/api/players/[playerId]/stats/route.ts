import { addPlayerStatistics } from '@/services/playerStatisticsService';

import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
    { params }: { params: { playerId: string } }
) {
    const body = await req.json();
    const { playerId, buyInAmount, cashOutAmount } = body;

    try {
      const newStatistics = await addPlayerStatistics({playerId, buyInAmount, cashOutAmount});
      return NextResponse.json(newStatistics)
    } catch (error) {
      console.error('Error adding player statistics:', error);
      return new NextResponse('An error occurred while adding player statistics.', { status: 500 });
    }
}