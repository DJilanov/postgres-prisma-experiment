import prisma from './';

/**
 * Updates the specified notification to set its status as seen.
 * 
 * This asynchronous function marks a notification as seen in the database by updating its `seen` status to `true`.
 * 
 * @async
 * @function
 * @param {string} id - The unique identifier of the notification to be updated.
 * @returns {Promise<INotification>} A promise that resolves to the updated `INotification` object.
 */
const PatchNotificationToSeen = async (id: string) => {
  const notification = await prisma.notifications.update({
    where: {
      id,
    },
    data: {
      seen: true,
    }
  });
	return notification;
}

export { PatchNotificationToSeen };
