import { z } from 'zod';

export const TokenObtainPairRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export type TokenObtainPairRequest = z.infer<typeof TokenObtainPairRequestSchema>;
