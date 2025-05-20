import { z } from 'zod';

export const createTokenSchema = z.object({
  name: z.string().min(3, { message: 'Token name is required' }),
  symbol: z.string().min(3, { message: 'Token symbol is required' }),
  imageUrl: z.string().url({ message: 'Invalid URL format' }).optional(),
  initialSupply: z
    .coerce
    .number()
    .positive({ message: 'Initial supply must be a positive number' })
    .int({ message: 'Initial supply must be an integer' }),
})

export type CreateTokenSchema = z.infer<typeof createTokenSchema>
