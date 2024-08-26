import { GetNotifications } from '@/db/getNotifications';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
 
const t = initTRPC.create();
 
export const router = t.router({
  // Create procedure at path 'greeting'
  getNotifications: t.procedure
    .query(async (opts) => {
      return await GetNotifications();
    }),
});
 
export const caller = router.createCaller(router);