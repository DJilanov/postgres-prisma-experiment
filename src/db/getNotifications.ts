import prisma from './';

/**
 * Retrieves a list of notifications from the database.
 * 
 * This asynchronous function fetches notifications from the database, ordered by their `seen` status.
 * Notifications that have not been seen are listed before those that have been seen.
 * 
 * @async
 * @function
 * @returns {Promise<INotification[]>} A promise that resolves to an array of `INotification` objects.
 */
const GetNotifications = async () => {
  const notifications = await prisma.notifications.findMany({
    // Uncomment the line below to filter out seen notifications if needed
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
