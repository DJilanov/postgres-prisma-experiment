import prisma from './';

/**
 * @description Returns notifications.
 * @async
 * @returns { INotification[] } INotification[]
 */
const GetNotifications = async () => {
  const notifications = await prisma.notifications.findMany({
    where: {
      seen: false,
    }
  });
	return notifications;
}

export { GetNotifications };
