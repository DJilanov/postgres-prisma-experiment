'use server';
 
import { z } from 'zod';
import { schema } from '@/schemas/markNotificationAsRead';
import { response } from '@/lib/utils';
 
export const markNotificationAsRead = async (payload: z.infer<typeof schema>) => {
  return response({
    success: true,
    code: 200,
    data: {
      notification: 'TODO'
    }
  });
}
