
# Postgres-prisma-experiment

This repository is an experimental project that demonstrates the integration of [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) in a [Next.js](https://nextjs.org/) application. The project serves as a playground for exploring database interactions, schema management, and API development with modern web technologies.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Development Server](#running-the-development-server)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Running Migrations](#running-migrations)
  - [Seeding the Database](#seeding-the-database)
  - [Generating Prisma Client](#generating-prisma-client)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Prisma**: An ORM for seamless database interactions with PostgreSQL.
- **PostgreSQL**: A powerful, open-source relational database system.
- **TypeScript**: Type-safe development for robust and scalable applications.
- **API Routes**: RESTful API integration with Next.js.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DJilanov/postgres-prisma-experiment.git
   cd postgres-prisma-experiment
   ```

2. **Install dependencies:**

   If you're using npm:

   ```bash
   npm install
   ```

   Or with yarn:

   ```bash
   yarn install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/yourdatabase?schema=public"
```

### Database Setup

1. **Create a new PostgreSQL database:**

   ```sql
   CREATE DATABASE notifications;
   ```

2. **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Project Structure

```
/postgres-prisma-experiment
|-- prisma/                 # Prisma schema and migrations
|-- public/                 # Public assets like images, fonts, etc.
|-- src/
|   |-- app/                # Next.js app router pages
|   |-- actions/            # Next.js actions 
|   |-- components/         # Shared components and their styles
|   |-- db/                 # DB communication scripts
|   |-- interfaces/         # Interfaces of the models
|   |-- lib/                # Shared utils
|   |-- schemas/            # Schemas used from Zod
|   |-- types/              # Communication types
|   |-- server/             # TRPC client used for communication
|-- .env                    # Environment variables
|-- package.json            # Project dependencies and scripts
|-- README.md               # Project documentation
```

## Usage

### Running Migrations

To apply database migrations:

```bash
npx prisma migrate dev
```

### Seeding the Database

To seed the database with initial data:

```bash
npx prisma db seed
```

### Generating Prisma Client

If you update the Prisma schema, regenerate the Prisma Client:

```bash
npx prisma generate
```

## Deployment

For deploying your Next.js application, consider platforms like [Vercel](https://vercel.com/), [Heroku](https://www.heroku.com/), or [Docker](https://www.docker.com/). Ensure that your environment variables are properly set in the deployment environment.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
