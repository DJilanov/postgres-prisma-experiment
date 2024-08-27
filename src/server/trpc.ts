import { GetNotifications } from '@/db/getNotifications';
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

/**
 * TRPC router for managing notifications.
 * 
 * This router defines procedures for interacting with notification data, including retrieving a list of notifications.
 * 
 * @constant
 * @type {TRPCRouter}
 */
export const router = t.router({
  /**
   * Procedure to fetch notifications from the database.
   * 
   * This query retrieves all notifications using the `GetNotifications` function and returns them.
   * 
   * @async
   * @function
   * @returns {Promise<INotification[]>} A promise that resolves to an array of `INotification` objects.
   */
  getNotifications: t.procedure
    .query(async () => {
      const notifications = await GetNotifications();
      return notifications;
    }),
});

export const caller = router.createCaller(router);
