import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';

class ActionError extends Error {}

const baseActionClient = createSafeActionClient({
    handleReturnedServerError(e) {
      if (e instanceof ActionError) {
        return e.message;
      }
  
      console.error(e.message);
      return DEFAULT_SERVER_ERROR_MESSAGE;
    },
  }).use(async ({ next }) => {
    const user = { email: "test@gmail.com", role: "admin" }

    const result = await next({ ctx: { user } });
    console.log(result);
    return result;
  });


export const otherClient = baseActionClient.use(async ({ next, ctx }) => {
    const { user } = ctx;
  
    if (user.role !== "admin") {
      throw new Error('Unauthorized');
    }
  
    return next({ ctx: { user } });
  });