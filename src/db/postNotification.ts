import { INotificationForm } from "@/interfaces/notification";
import prisma from './';


/**
 * @description Create notification.
 * @async
 * @returns { INotification } INotification
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
