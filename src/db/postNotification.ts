import { INotificationForm } from "@/interfaces/notification";
import prisma from './';


/**
 * Creates a new notification in the database.
 * 
 * This asynchronous function inserts a new notification into the database with the provided details.
 * It sets the `seen` status of the notification to `false` upon creation.
 * Note: Prisma currently does not support enums directly.
 * 
 * @async
 * @function
 * @param {INotificationForm | any} notif - The notification data to be created. This object should conform to the `INotificationForm` interface.
 * @returns {Promise<INotification>} A promise that resolves to the created `INotification` object.
 */
// Prisma doesnt support enums
const PostNotification = async (notif: INotificationForm | any) => {
  const notification = await prisma.notifications.create({
    data: {
      type: notif.type ?? '',
      name: notif.name ?? '',
      release_number: notif.release_number ?? '',
      seen: false,
    }
  });
	return notification;
}

export { PostNotification };
