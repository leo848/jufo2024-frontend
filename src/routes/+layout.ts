import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

export const ssr = false;

inject();
injectSpeedInsights();
