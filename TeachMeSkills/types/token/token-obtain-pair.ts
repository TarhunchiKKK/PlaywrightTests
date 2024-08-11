import { z } from 'zod';

export const TokenObtainPairSchema = z.object({
    access: z.string(),
    refresh: z.string(),
});

export type TokenObtainPair = z.infer<typeof TokenObtainPairSchema>;
