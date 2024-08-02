# contra (Svelte Webapp)

This is built using SvelteKit, AWS, Prisma(ORM), and Flowbite (UI Library).

As a user you can:

- Create an account
- Login with an existing account
- Create/update your profile
- Create a new contract which is saved in a S3 bucket

I have used **Prisma** as the ORM to interact with the database. For now, it uses a local SQLite database but can be easily changed to a different database (AWS hosted PostgresSQL, etc.)
The schema for the database is in the `prisma/schema.prisma` file.

The contracts are saved in a S3 bucket. The bucket name and region are defined in the `.env` file. The contracts are saved in the `contracts` folder in the bucket.

**_(For testing only)_** I am pushing `.env` file with my credentials.

## Setting up local DB

We will use a local SQLite database for this project. You can change the database to a different one by changing the connection string in the `DATABASE_URL` environment variable.
This will create a `dev.db` file in the `prisma` folder.

```bash
pnpm install
npx prisma generate
npx prisma db push
```

## Running the Project

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

## Things TODO:

- [ ] Protect unauthorized access to different routes. Svelte offers protected routes.
- [ ] Input validation for the forms. I created this to showcase svelte and prisma.
