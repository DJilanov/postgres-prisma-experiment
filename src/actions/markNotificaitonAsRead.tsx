'use server';

import { z } from 'zod';
import { redirect, RedirectType } from 'next/navigation';
import { schema } from '@/schemas/markNotificationAsRead';
import { response } from '@/lib/utils';
import { PatchNotificationToSeen } from '@/db/patchNotificationToSeen';

const RedirectEnum = {
  comment_tag: '/comments',
  access_granted: '/chats',
  join_workspace: '/workspace',
};

/**
 * Marks a notification as read and performs a redirection if applicable.
 * 
 * This function validates the payload against a predefined schema.
 * If the payload is valid, it updates the notification status to "seen".
 * Depending on the notification type, it may also redirect the user to a specific URL.
 * 
 * @param {z.infer<typeof schema>} payload - The data required to mark the notification as read.
 * @returns {Promise<Object|void>} - A promise that resolves to a response object indicating success or failure, or redirects the user.
 */
export const markNotificationAsRead = async (payload: z.infer<typeof schema>) => {
  const validation = schema.safeParse(payload);

  if (!validation.success) {
    return response({
      success: false,
      error: {
        code: 422,
        type: 'NOT_AVAILABLE',
        message: JSON.stringify(validation.error.issues),
      },
    });
  }

  const updatedNotification = await PatchNotificationToSeen(payload.id);

  if (RedirectEnum[updatedNotification.type as never]) {
    redirect(RedirectEnum[updatedNotification.type as never], RedirectType.replace);
  } else {
    return response({
      success: true,
      code: 200,
      data: updatedNotification,
    });
  }
};
