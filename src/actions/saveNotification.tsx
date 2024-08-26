'use server';
 
import { z } from 'zod';
import { schema } from '@/schemas/saveNotification';
import { response } from '@/lib/utils';
import { INotificationTypeEnum } from '@/interfaces/notification';
 
export const saveNotification = async (payload: z.infer<typeof schema>) => {
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
  return response({
    success: true,
    code: 200,
    data: {
      id: 'TODO',
      name: 'TODO',
      type: 'comment_tag' as INotificationTypeEnum,
      seen: false
    }
  });
}
