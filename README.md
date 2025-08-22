# COGENT Frontend

## Overview

COGENT Frontend is a web application built with React, TypeScript and [Vite](https://vitejs.dev/). It provides the interface for administering the **Batería de Riesgo Psicosocial COGENT** questionnaires and visualizing their results.

## Purpose

This frontend allows psychologists and administrators to distribute and review COGENT questionnaires, compute scores and generate reports on psychosocial risk factors within an organization.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- npm, which is included with Node.js

## Installing dependencies

Clone the repository and install the required packages:

```bash
npm install
```

After installing dependencies, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

## Development server

Start the local development server with hot reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Building for production

To create an optimized production build, run:

```bash
npm run build
```

This command compiles the TypeScript sources and outputs the final assets to the `dist` directory. The build can be previewed locally using:

```bash
npm run preview
```

## Linting

Run ESLint on the project files with:

```bash
npm run lint
```

## Testing

This project includes a small test suite using Node's built-in test runner. To
execute it, first compile the TypeScript sources and then run the tests:

```bash
npx tsc -p tsconfig.json --outDir dist_test
node --test dist_test/utils/buildReportPayload.test.js
```

## Project structure

- `src/` - Application source code
- `public/` - Static assets served directly
- `index.html` - Entry point for the application
- Compiled JavaScript generated from the TypeScript sources is excluded from
  version control. Only the `.ts` and `.tsx` files under `src/` are tracked.

## Firebase storage

Results are saved in a Firestore collection named `resultadosCogent`. Edit
`src/firebaseConfig.ts` with your Firebase project details before deploying.
User credentials are synchronized through another collection called
`credencialesCogent`.

## Sample credentials

Default demo accounts are provided via the `VITE_DEMO_CREDENTIALS` environment
variable. When the application starts it fetches any stored credentials from the
`credencialesCogent` collection and merges them with the demo accounts.
These credentials are defined in `.env.example` which you should copy to `.env`.
You can adjust the demo accounts by editing `VITE_DEMO_CREDENTIALS`:

- **Psicóloga**: `psicologa` / `cogent2024`
- **Sonria**: `sonria` / `sonria123`
- **Aeropuerto**: `aeropuerto` / `eldorado123`

In the dashboard's **Empresas** tab you can review all stored credentials and
add, edit or delete them. These changes are persisted to Firestore so they are
available to all users of the dashboard.

