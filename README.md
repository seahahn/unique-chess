# Unique Chess

## Overview

Unique Chess is a modern, browser-based 3D chess web platform supporting real-time multiplayer gameplay, live chat, customizable 3D boards and pieces, user authentication, payments, advertising, SEO, and internationalization. The platform is designed for scalability, maintainability, and developer productivity using a contemporary, modular tech stack.

---

## Technical Architecture

### Monorepo & Tooling

- **Monorepo Management:** Turborepo
- **Code Style & Convention:** biome
- **Environment Variables & Secrets:** infisical

### Core Application

- **Framework:** SolidStart (SSR, CSR, SSG support)
- **State Management:** Solid Store (SolidJS built-in reactivity)
- **3D Rendering:** Three.js

### Communication

- **API:** tRPC (type-safe, end-to-end API)
- **Real-time:** Dedicated WebSocket server (separate app in monorepo)
- **Authentication:** JWT-based authentication for both client-server and inter-server communication

### Database

- **Platform:** Supabase (PostgreSQL-based BaaS)
- **Structure:**
  - Two separate Supabase projects (each with its own PostgreSQL database):
    - One for main application data
    - One for user authentication data

### Object Storage

- **Service:** MinIO (self-hosted, S3-compatible object storage)
- **Purpose:** Store and manage images, videos, and other unstructured files (e.g., user-uploaded media, game replays, assets). Supports versioning, lifecycle management, and efficient media access.

### Authentication

- **Library:** Better Auth (integrated into SolidStart)
- **Methods:** Email-password (primary), Google OAuth2
- **Token Management:** JWT
- **Authentication Database:** Dedicated Supabase PostgreSQL database/project

### Design System

- **CSS Framework:** Tailwind CSS v4
- **Component Library:** DaisyUI (with Tailwind CSS)

### Payments & Advertising

- **Payments:** Stripe (annual/monthly memberships)
- **Advertising:** Google Ads (for non-members)

### SEO & Internationalization

- **SEO:** SSR meta tags, sitemap, robots.txt, etc.
- **i18n:** solid-i18n

---

## Key Features

### Gameplay

- 3D chessboard and piece rendering
- 1:1 and 1:N (multiple spectators/participants) matches
- Real-time game state synchronization
- User-customizable board and piece skins (visible to other users)

### Chat

- In-game real-time chat (WebSocket)
- 1:1 and 1:N chat support

### User Management

- Email-password and Google social login
- JWT-based authentication/session management
- User profile, settings, and skin management

### Payments & Advertising

- Stripe-based membership payments
- Ads shown to non-members

### SEO & Accessibility

- SSR-based SEO optimization
- Multilingual support
- Accessibility (A11y) compliance

### Media & Asset Management

- Images, videos, and other assets are stored and served via MinIO object storage
- Scalable, secure, and efficient access to user-uploaded and system assets

---

## Deployment & Development

### Deployment

- **Containerization:** Docker-based deployment for both SolidStart and WebSocket servers (each workspace has its own Dockerfile)
- **CI/CD:** GitHub Actions builds and deploys Docker images
- **Deployment Platforms:** Netlify or Fly.io (free tier preferred for initial stage)

### Local Development

- **Orchestration:** docker-compose for running multiple containers (app servers, both Supabase DBs, MinIO, etc.) simultaneously

---

## Additional Considerations

- **Security:** Password hashing, CSRF/XSS protection, rate limiting, etc.
- **Scalability:** Authentication can be separated as a microservice if needed
- **Monitoring/Logging:** Logging of authentication events and system health
- **Documentation:** Clear onboarding, API, and component documentation
- **Supabase Limitation:** Each Supabase project is tied to a single PostgreSQL database; multiple databases require multiple projects

---

> All decisions are made with scalability, maintainability, developer productivity, and modern web standards in mind.
