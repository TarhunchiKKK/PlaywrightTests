import { z } from 'zod';

export const TokenVerifySchema = z.object({
    token: z.string(),
});

export type TokenVerify = z.infer<typeof TokenVerifySchema>;
