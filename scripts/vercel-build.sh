#!/bin/bash
set -euo pipefail

DB_URL="${POSTGRES_PRISMA_URL:-${DATABASE_URL:-${STORAGE_URL:-${POSTGRES_URL:-}}}}"

if [ -z "$DB_URL" ]; then
  echo "ERROR: No database URL found."
  echo "Connect Neon to solara-main in Vercel Storage."
  echo "Expected POSTGRES_PRISMA_URL or DATABASE_URL."
  exit 1
fi

export POSTGRES_PRISMA_URL="$DB_URL"
export DATABASE_URL="$DB_URL"

echo "Database URL configured. Running prisma generate..."
npx prisma generate

echo "Running prisma db push..."
npx prisma db push --accept-data-loss

echo "Running prisma seed..."
npx prisma db seed

echo "Running next build..."
npx next build
