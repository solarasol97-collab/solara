const { execSync } = require("child_process");

function run(command) {
  execSync(command, { stdio: "inherit", env: process.env });
}

// Neon may expose POSTGRES_PRISMA_URL; custom prefix may expose DATABASE_URL or STORAGE_URL
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    process.env.POSTGRES_PRISMA_URL ||
    process.env.STORAGE_URL ||
    process.env.POSTGRES_URL;
}

if (!process.env.DATABASE_URL) {
  console.error("ERROR: No database URL found.");
  console.error(
    "Connect Neon to solara-main in Vercel Storage and ensure DATABASE_URL or POSTGRES_PRISMA_URL is set."
  );
  process.exit(1);
}

run("prisma generate");
run("prisma db push --accept-data-loss");
run("prisma db seed");
run("next build");
