import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string(),
  VITE_MAPBOX_TOKEN: z.string(),
});

export const validateEnv = () => {
  try {
    return envSchema.parse({
      VITE_API_URL: import.meta.env.VITE_API_URL,
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
      VITE_MAPBOX_TOKEN: import.meta.env.VITE_MAPBOX_TOKEN,
    });
  } catch (error) {
    console.error('Invalid environment variables:', error);
    throw new Error('Invalid environment configuration');
  }
};