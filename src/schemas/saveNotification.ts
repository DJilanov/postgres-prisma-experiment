import { z } from "zod";

export const schema = z.object({
  type: z.union([z.literal('platform_update'), z.literal('comment_tag'), z.literal('access_granted'), z.literal('join_workspace')]),
  release_number: z.string().optional(),
  name: z.string().optional(),
}).superRefine(({ type, release_number, name }, refinementContext) => {
  if(type === 'platform_update' && !release_number?.length) {
    return refinementContext.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Release number is required.",
      path: ['release_number'],
    });
  }
  if(
    (type === 'comment_tag') ||
    (type === 'access_granted') ||
    (type === 'join_workspace')
  ) {
    if(!name) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name is required.",
        path: ['name'],
      });
    }
  }
  return refinementContext;
});