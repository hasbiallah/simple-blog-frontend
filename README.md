# simple-blog-frontend

A React frontend for a simple blog application, built with Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router DOM v7
- **State Management**: Zustand
- **Forms**: React Hook Form
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js >= 18

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file and configure it:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/                  # Application-level config (router, providers)
├── features/
│   ├── articles/         # Articles feature
│   ├── auth/             # Authentication feature
│   └── comments/         # Comments feature
├── shared/               # Shared components, hooks, and utilities
│   ├── components/
│   │   ├── layout/       # Layout components (Navbar, Footer, Layout)
│   │   └── ui/           # Reusable UI components
│   ├── hooks/
│   └── utils/
├── lib/                  # External library configurations (axios)
└── types/                # Global TypeScript types
```

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
