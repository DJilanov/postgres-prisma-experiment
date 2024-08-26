import { GetNotifications } from '@/db/getNotifications';
import { initTRPC } from '@trpc/server';
 
const t = initTRPC.create();
 
export const router = t.router({
  getNotifications: t.procedure
    .query(async () => {
      const notifications = await GetNotifications();
      return notifications;
    }),
});
 
export const caller = router.createCaller(router);