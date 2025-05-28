// env.d.ts
declare module '@env' {
  export const API_URL: string;
  export const APP_ENV: 'dev' | 'prod';
  export const APP_DEBUG: boolean;
  export const APP_VERSION: string;
}
