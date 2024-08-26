'use server';
 
import { z } from 'zod';
import { redirect, RedirectType } from 'next/navigation';
import { schema } from '@/schemas/markNotificationAsRead';
import { response } from '@/lib/utils';
import { PatchNotificationToSeen } from '@/db/patchNotificationToSeen';

const RedirectEnum = {
  platform_update: '/',
  comment_tag: '/comments',
  access_granted: '/chats',
  join_workspace: '/workspace',
}
 
export const markNotificationAsRead = async (payload: z.infer<typeof schema>) => {
  const validation = schema.safeParse(payload);
  if (!validation.success) {
    return response({
      success: false,
      error: {
        code: 422,
        type: 'NOT_AVAILABLE',
        message: JSON.stringify(validation.error.issues),
      }
    });
  }
  const updatedNotification = await PatchNotificationToSeen(payload.id);
  if(updatedNotification.type !== 'platform_update') {
    console.log('redirect to: ', RedirectEnum[updatedNotification.type as never]);
    redirect(RedirectEnum[updatedNotification.type as never], RedirectType.replace);
  } else {
    return response({
      success: true,
      code: 200,
      data: updatedNotification
    });
  }
}
