'use server';

import { z } from 'zod';
import { schema } from '@/schemas/saveNotification';
import { response } from '@/lib/utils';
import { PostNotification } from '@/db/postNotification';

/**
 * Saves a notification based on the provided payload.
 * 
 * This function validates the payload against a predefined schema.
 * If the payload is valid, it creates a new notification.
 * If the payload is invalid, it returns an error response with the validation issues.
 * 
 * @param {z.infer<typeof schema>} payload - The notification data to be saved.
 * @returns {Promise<Object>} - A promise that resolves to a response object indicating success or failure.
 */
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
};
