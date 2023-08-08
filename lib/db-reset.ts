import prismadb from "./prismadb";

const tableNames = ["GameParticipants", "GameStatistics", "Games", "PlayerStatistics", "Players"];

async function main() {
  for (const tableName of tableNames) await prismadb.$queryRawUnsafe(`Truncate ${tableName} restart identity cascade;`);
}

main().finally(async () => {
  await prismadb.$disconnect();
});