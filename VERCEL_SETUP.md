# Vercel-only setup (no Hostinger database)

This backend no longer uses Hostinger MySQL. Use **Vercel Postgres** instead.

## 1. Create a Postgres database in Vercel

1. Open [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open the **solara-main** project (the one connected to `solaraordering.com`)
3. Go to the **Storage** tab
4. Click **Create Database** → choose **Postgres**
5. Name it (e.g. `solara-db`) and connect it to the **solara-main** project
6. Vercel will automatically add environment variables such as:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - Or `DATABASE_URL` if you used the `DATABASE` prefix when connecting

## 2. Confirm a database URL exists

The build script accepts any of these (in order):
- `DATABASE_URL`
- `POSTGRES_PRISMA_URL`
- `STORAGE_URL`
- `POSTGRES_URL`

If you connected Neon with the `DATABASE` prefix, `DATABASE_URL` is created automatically.

If not, go to **solara-main → Settings → Environment Variables** and either:
- Confirm `DATABASE_URL` exists, **or**
- Add `DATABASE_URL` with the value copied from `POSTGRES_PRISMA_URL`

## 3. Remove the old Hostinger DATABASE_URL (if present)

Delete any `DATABASE_URL` that points to:
- `srv1454.main-hosting.eu`
- `u191735999_root`

That database belonged to old Hostinger hosting and is no longer available.

## 4. Redeploy

1. **Deployments** → latest deployment → **Redeploy**
2. The build will:
   - Generate Prisma client
   - Create all tables (`prisma db push`)
   - Seed the default admin user
   - Build Next.js

## 5. Verify

```bash
curl https://solaraordering.com/api/users
```

You should get JSON (not a 500 database error).

## Default admin login

After the first deploy with the new database:

| Field | Value |
|-------|--------|
| Email | `admin@themesbrand.com` |
| Password | `123456` |

Change this password after logging in.
