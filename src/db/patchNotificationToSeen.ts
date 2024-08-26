import prisma from './';

/**
 * @description Set notification to seen.
 * @async
 * @returns { INotification } INotification
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
