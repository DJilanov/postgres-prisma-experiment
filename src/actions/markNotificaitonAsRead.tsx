'use server';
 
import { z } from 'zod';
import { schema } from '@/schemas/markNotificationAsRead';
import { response } from '@/lib/utils';
import { PatchNotificationToSeen } from '@/db/patchNotificationToSeen';
 
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
  return response({
    success: true,
    code: 200,
    data: updatedNotification
  });
}
