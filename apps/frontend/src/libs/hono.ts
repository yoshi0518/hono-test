import type { AppType } from 'backend/src/features';
import { env } from '@/env';
import { hc } from 'hono/client';

export const honoClient = hc<AppType>(env.API_URL);
