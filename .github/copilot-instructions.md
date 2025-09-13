# Copilot Instructions for Won-Save

## Project Overview
- **Won-Save** is a React + TypeScript web app scaffolded with Vite. It uses a modular component structure under `src/components/` and organizes app logic by feature in `src/app/`.
- The app manages users, goals, transactions, and analytics. Data is structured around a `User` type (see `src/types.ts`).
- UI state and data flows are managed with React hooks and context providers (e.g., `SidebarProvider`).

## Key Architectural Patterns
- **Component Structure:**
  - UI components are in `src/components/`, grouped by feature (e.g., `add-goal.tsx`, `section-cards.tsx`).
  - Shared UI primitives are in `src/components/ui/`.
  - App pages are in `src/app/`, with feature folders (e.g., `dashboard/`).
- **Data Flow:**
  - User and transaction data is loaded from `src/app/dashboard/data.json` and normalized to the `User` type.
  - State is managed at the page level (see `src/app/dashboard/page.tsx`).
  - Components receive data and callbacks via props (e.g., `onDeposit`, `onWithdraw`).
- **Type Safety:**
  - All major data structures are defined in `src/types.ts`.
  - TypeScript strictness is enforced; always match prop and data types to these definitions.

## Developer Workflows
- **Development:**
  - Start the dev server: `npm run dev`
  - Build for production: `npm run build`
  - Preview production build: `npm run preview`
- **Linting:**
  - ESLint is configured for type-aware linting. See `eslint.config.js` and the README for extending rules.
- **Testing:**
  - No test framework is scaffolded by default. Add tests in `src/` as needed.

## Project-Specific Conventions
- **Props:**
  - Components expect strongly-typed props. For example, `AppSidebar` expects a single `user` prop, not `users`.
  - Pass event handlers (e.g., `onSelectView`, `onDeposit`) explicitly.
- **Data Normalization:**
  - When loading from JSON, ensure transaction types are cast to the union type (`"deposit" | "withdrawal"`).
- **UI Patterns:**
  - Use context providers for layout (e.g., `SidebarProvider`).
  - Use feature folders for grouping related logic and UI.

## Integration Points
- **Vite** is used for dev/build tooling.
- **Recharts** is used for charting (see `chart-area-interactive.tsx`).
- **Supabase** integration is scaffolded in `src/lib/Supabase.ts` (not fully implemented).

## Examples
- See `src/app/dashboard/page.tsx` for the main data flow and state management patterns.
- See `src/types.ts` for all core data types.
- See `src/components/section-cards.tsx` for a typical UI component with event handlers.

---

For new features, follow the established folder and type patterns. When in doubt, reference the dashboard page and types file for canonical usage.
