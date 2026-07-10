export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
} as const;

export type AppRoutes = (typeof ROUTES)[keyof typeof ROUTES];
