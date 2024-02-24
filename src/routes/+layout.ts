import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
import { dev } from '$app/environment';

export const ssr = false;

if (!dev) {
	inject({ mode: 'production' });
	injectSpeedInsights();
}
