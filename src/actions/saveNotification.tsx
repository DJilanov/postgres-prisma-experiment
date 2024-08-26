'use server';
 
import { z } from 'zod';
import { schema } from '@/schemas/saveNotification';
import { response } from '@/lib/utils';
import { PostNotification } from '@/db/postNotification';
 
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
  const createdNotification = await PostNotification(payload);
  return response({
    success: true,
    code: 200,
    data: createdNotification,
  });
}
