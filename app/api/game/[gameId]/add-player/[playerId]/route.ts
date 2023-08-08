import prismadb from "@/lib/prismadb";

export async function GET() {
    const tableNames = ['BuyIn', 'GameParticipants', 'GameStatistics', 'Games', 'PlayerStatistics', 'Players'];

    const main =  async () => {
        for (const tableName of tableNames) await prismadb.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
    }
      
    main().finally(async () => {
        await prismadb.$disconnect();
    });
}