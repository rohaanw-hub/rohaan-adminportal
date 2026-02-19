# HCSS Admin Platform — Prototype

A high-fidelity prototype of the HCSS Admin Platform built with React, TypeScript, and Tailwind CSS. All data is in-memory mock data — no backend required.

## Modules

| Module | Route | Description |
|---|---|---|
| Access Management | `/access` | Users, Groups, Roles, Policies |
| Auditing | `/audit` | Audit logs (placeholder) |
| Billing & Subscriptions | `/billing` | Plans, Invoices, Payment methods |
| Insights | `/insights` | Embedded report viewer |
| Integrations & APIs | `/integrations` | Connected apps, Credentials, Webhooks, Event Logs, Field Mapper |
| Setup Data | `/setup` | Employees, Equipment, Materials, Locations, Jobs, and more |
| System Settings | `/settings` | Notifications, Language, Preferences, Company Settings |

## Tech Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v3**
- **React Router v6** — nested routes per module
- **Lucide React** — icons
- **In-memory mock data** — no API calls

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Production build
npm run build
```

## Project Structure

```
src/
  components/
    layout/         — Shell, TopNav, SecondaryNav, AiCommandPalette
    ui/             — Reusable UI primitives (Button, Badge, Table, etc.)
  modules/
    access-management/
    billing/
    insights/
    integrations/   — includes IntegrationMapper (AI field mapping UI)
    setup-data/
    system-settings/
  data/             — Typed mock data (users, billing, integrations, etc.)
  types/            — Shared TypeScript interfaces
  lib/              — Utilities (cn)
public/
  hcss-logo.png
```

## Key Features

- **Global AI search** — ⌘K opens the AI command palette (mock NLP)
- **Collapsible secondary nav** — context-aware per module, fully collapsible
- **Integration Field Mapper** — drag-and-drop field mapping with Simple / Combine / Transform modes and formula preview
- **Responsive tables** — searchable, filterable data throughout
- **Billing seat management** — live cost calculation dialog
- **Notifications matrix** — per-event, per-channel toggle grid
