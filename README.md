# Alobaba: AKP Techical Test

This project is a clone of the search result for "B2B Used Mobile Phones" on the e-commerce site Alibaba.com, created to fulfill the AKP Technical Test.

## Techstack
- Turborepo [https://turborepo.com]
- Bun [https://bun.sh]
- React Router & Vite using Framework Mode [https://reactrouter.com/start/framework/installation]
- Radix UI [http://radix-ui.com/primitives]
- Honojs [https://hono.dev/docs]
- TRPC [https://trpc.io]
- Prisma [https://prisma.io]
- Postgresql [https://www.postgresql.org]
- IPaymu (payment gateway) [https://ipaymu.com]

## Features
- [x] Auth (Sign In & Sign Up)
- [x] Product Lists
- [x] Product Search & Filter by price
- [x] Product Detail
- [x] Shopping Cart
- [x] Payment with Payment Gateway
- [x] Order History Page
- [ ] Product Management
- [ ] Product Review
- [ ] Implement Order Tracking

## Quick Start
### 1. Clone this project

```bash
# clone project 
git clone https://github.com/bnurd/alobaba.git
```

### 2. Install Packages and Dependecies

> **Note**:
> Make sure you have Bun installed on your local machine

```bash
# Install all the necessary dependencies.
bun install

# Create a .env file based on .env.example in the root directory.
# Please make sure to fill in all the environment variables
cp .env.example .env
```

### 3. Setup Database

**Database migration**
```bash
# migrate database
bun run db:migrate
```
**Database seeding**
> You can modify the seeding data with your own desired values. You can do this in the `root/packages/database/seed/index.ts file.`

> By default, the seeding data is sourced from Alibaba.com
```bash
# seed database
bun run db:seed
```

**Other Database Setting**
```bash
# generate database
# This command is executed by default when you run the project
bun run db:generate

# reset database
bun run db:reset

# deploy to production
bun run db:deploy
```

### 4. Running Development
```bash
# running dev
# This command will run both the frontend and backend projects
bun run dev
```

### 5. Build and running project for production
```bash
# build project
bun run build

# running production
bun run start
```

### 6. (optional) Deploy using docker

> **Note:** This project uses Docker Compose with an unoptimized strategy. You can modify the containerization approach as you see fit to achieve better performance.
> You can refer this docs: https://turborepo.com/docs/guides/tools/docker

> Make sure you filled all envirotment variable
```bash
# running docker compose
docker compose up -d

# frontend port 3000
# backend port 3200
```
