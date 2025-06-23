# 3D Chess Web Platform – Product Requirements Document (PRD)

---

## 1. Overview

The 3D Chess Web Platform is a modern, browser-based chess service that supports real-time multiplayer gameplay, live chat, customizable 3D boards and pieces, user authentication, payments, advertising, SEO, and internationalization. The platform is designed for scalability, maintainability, and developer productivity using a contemporary, modular tech stack.

---

## 2. Technical Architecture

### 2.1 Monorepo & Tooling

- **Monorepo Management:** Turborepo
- **Code Style & Convention:** biome
- **Environment Variables & Secrets:** infisical

### 2.2 Core Application

- **Framework:** SolidStart (SSR, CSR, SSG support)
- **State Management:** Solid Store (SolidJS built-in reactivity)
- **3D Rendering:** Three.js

### 2.3 Communication

- **API:** tRPC (type-safe, end-to-end API)
- **Real-time:** Dedicated WebSocket server (separate app in monorepo)
- **JWT-based authentication** for both client-server and inter-server communication

### 2.4 Database

- **Platform:** Supabase (PostgreSQL-based BaaS)
- **Structure:**
  - Two separate Supabase projects (each with its own PostgreSQL database):
    - One for the main application data
    - One for user authentication data

### 2.5 Object Storage

- **Service:** MinIO (self-hosted, S3-compatible object storage)
- **Purpose:**
  - Store and manage images, videos, and other unstructured files (e.g., user-uploaded media, game replays, assets).
  - MinIO provides scalable, high-performance, and secure storage, with S3 API compatibility for easy integration into the platform.
  - Enables features like versioning, lifecycle management, and efficient media access.

### 2.6 Authentication

- **Library:** Better Auth (integrated directly into SolidStart codebase)
- **Methods:** Email-password (primary), Google OAuth2
- **Token Management:** JWT
- **Authentication Database:** Dedicated Supabase PostgreSQL database/project

### 2.7 Design System

- **CSS Framework:** Tailwind CSS v4
- **Component Library:** DaisyUI (with Tailwind CSS)

### 2.8 Payments & Advertising

- **Payments:** Stripe (annual/monthly memberships)
- **Advertising:** Google Ads (for non-members)

### 2.9 SEO & Internationalization

- **SEO:** SSR meta tags, sitemap, robots.txt, etc.
- **i18n:** solid-i18n

---

## 3. Deployment & Development

### 3.1 Deployment

- **Containerization:** Docker-based deployment for both SolidStart and WebSocket servers (each workspace has its own Dockerfile)
- **CI/CD:** GitHub Actions builds and deploys Docker images
- **Deployment Platforms:** Netlify or Fly.io (free tier preferred for initial stage)

### 3.2 Local Development

- **Orchestration:** docker-compose for running multiple containers (app servers, both Supabase DBs, MinIO, etc.) simultaneously

---

## 4. Key Features

### 4.1 Gameplay

- 3D chessboard and piece rendering
- 1:1 and 1:N (multiple spectators/participants) matches
- Real-time game state synchronization
- User-customizable board and piece skins (visible to other users)

### 4.2 Chat

- In-game real-time chat (WebSocket)
- 1:1 and 1:N chat support

### 4.3 User Management

- Email-password and Google social login
- JWT-based authentication/session management
- User profile, settings, and skin management

### 4.4 Payments & Advertising

- Stripe-based membership payments
- Ads shown to non-members

### 4.5 SEO & Accessibility

- SSR-based SEO optimization
- Multilingual support
- Accessibility (A11y) compliance

### 4.6 Media & Asset Management

- Images, videos, and other assets are stored and served via MinIO object storage.
- Supports scalable, secure, and efficient access to user-uploaded and system assets.

---

## 5. Additional Considerations

- **Security:** Password hashing, CSRF/XSS protection, rate limiting, etc.
- **Scalability:** If traffic or requirements grow, consider separating authentication as a microservice.
- **Monitoring/Logging:** Plan for logging of authentication events and system health.
- **Documentation:** Maintain clear onboarding, API, and component documentation.
- **Supabase Limitation:** Each Supabase project is tied to a single PostgreSQL database; multiple databases require multiple projects.

---

> All decisions are made with scalability, maintainability, developer productivity, and modern web standards in mind.
