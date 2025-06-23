import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '~/lib/trpc/router';

const handler = (event: any) =>
  fetchRequestHandler({
    endpoint: '/trpc',
    req: event.request,
    router: appRouter,
    createContext: () => ({}), // Add auth/session context here if needed
  });

export const GET = handler;
export const POST = handler;