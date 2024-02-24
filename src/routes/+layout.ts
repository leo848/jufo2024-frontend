import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import { dev } from '$app/environment';

export const ssr = false;

inject({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();
