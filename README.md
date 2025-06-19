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

## Project structure

- `src/` - Application source code
- `public/` - Static assets served directly
- `index.html` - Entry point for the application

## Sample credentials

Default demo accounts are defined in `src/config/credentials.json`.
You can adjust or add accounts by editing this file:

- **Psicóloga**: `psicologa` / `cogent2024`
- **Sonria**: `sonria` / `sonria123`
- **Aeropuerto**: `aeropuerto` / `eldorado123`

In the dashboard's **Empresas** tab you can review all stored credentials,
including their passwords. Each entry provides **Editar** and **Eliminar**
actions. **Eliminar** removes a custom credential from `localStorage` and the
table instantly, while **Editar** lets you update the company name, username or
password.

