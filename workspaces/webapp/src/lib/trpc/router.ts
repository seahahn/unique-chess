import { router, procedure } from './init';
import { z } from 'zod';

// Example in-memory data
const todos = [{ message: 'Breakfast' }];

export const appRouter = router({
  getTodos: procedure.query(() => todos),
  createTodo: procedure
    .input(z.object({ message: z.string() }))
    .mutation(({ input }) => {
      todos.push({ message: input.message });
      return 'Complete';
    }),
});

export type AppRouter = typeof appRouter;