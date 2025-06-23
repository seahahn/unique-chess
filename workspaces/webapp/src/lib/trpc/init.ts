import { initTRPC } from '@trpc/server';

// Create tRPC instance
const t = initTRPC.create();

export const router = t.router;
export const middleware = t.middleware;
export const procedure = t.procedure;