import { z } from 'zod';

export const ActivationRequestSchema = z.object({
    uid: z.string(),
    token: z.string(),
});

export type ActivationRequest = z.infer<typeof ActivationRequestSchema>;
