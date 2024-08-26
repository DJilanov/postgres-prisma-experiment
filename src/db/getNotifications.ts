import prisma from './';

/**
 * @description Returns notifications.
 * @async
 * @returns { INotification[] } INotification[]
 */
const GetNotifications = async () => {
  const notifications = await prisma.notifications.findMany({
    // where: {
    //   seen: false,
    // }
    orderBy: [
      {
        seen: 'asc',
      },
    ]
  });
	return notifications;
}

export { GetNotifications };
