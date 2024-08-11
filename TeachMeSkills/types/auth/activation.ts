import { z } from 'zod';

export const ActivationSchema = z.object({
    uid: z.string(),
    token: z.string(),
});

export type Activation = z.infer<typeof ActivationSchema>;
