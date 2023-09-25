# Fullstack Admin Dashboard

- [Fullstack Admin Dashboard](#fullstack-admin-dashboard)
  - [Setup](#setup)
  - [Description](#description)

## Setup

Install dependencies
```npm i```

Start development server
```npm run dev```

env file
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
```

Generate prisma models and push them to PlanetScale
```
npx prisma generate
npx prisma db push
```

## Description

The admin dashboard is a two part project that works alongside an e-commerce store. The dashboard serves as an API and CMS that allows the user to customize the banner displayed in each category, perform CRUD operations on products and keep a detailed overview of sales and current products in stock.
