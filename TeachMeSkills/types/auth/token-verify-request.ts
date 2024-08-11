import { z } from 'zod';

export const TokenVerifyRequestSchema = z.object({
    token: z.string(),
});

export type TokenVerifyRequest = z.infer<typeof TokenVerifyRequestSchema>;
