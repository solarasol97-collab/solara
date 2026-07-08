#!/bin/bash
set -euo pipefail

DB_URL="${POSTGRES_PRISMA_URL:-${DATABASE_URL:-${STORAGE_URL:-${POSTGRES_URL:-}}}}"

if [ -n "$DB_URL" ]; then
  export POSTGRES_PRISMA_URL="$DB_URL"
  export DATABASE_URL="$DB_URL"
fi

npx prisma generate
