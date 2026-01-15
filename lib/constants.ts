export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  TIMEOUT: 10000,
} as const;

export const ROUTES = {
  HOME: '/',
  USERS: '/users',
  USER_DETAIL: (id: number | string) => `/users/${id}`,
} as const;

export const APP_CONFIG = {
  NAME: 'Client Dashboard',
  DESCRIPTION: 'Professional client dashboard built with Next.js, React & TypeScript',
  AUTHOR: 'Daniel',
  GITHUB_URL: 'https://github.com',
  API_SOURCE_URL: 'https://jsonplaceholder.typicode.com',
} as const;
