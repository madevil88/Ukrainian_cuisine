# Ukrainian Cuisine

A web application with recipes of Ukrainian cuisine.

## Tech Stack

- **[Next.js 16](https://nextjs.org)** — React framework with App Router
- **[React 19](https://react.dev)** — UI library
- **[HeroUI v3](https://www.heroui.com)** — component library
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first CSS
- **[TypeScript](https://www.typescriptlang.org)** — type safety

## Requirements

- **Node.js >= 20.9.0** (recommended: v24 LTS)
- **Docker** — for running the database

## Getting Started

**1. Install the required Node.js version (if using nvm):**
```bash
nvm install
nvm use
```

**2. Start the database:**
```bash
docker compose up -d
```

**3. Set up environment variables:**
```bash
cp .env.example .env
```

**4. Install dependencies and apply database schema:**
```bash
npm install
npx prisma db push
```

**5. Start the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
