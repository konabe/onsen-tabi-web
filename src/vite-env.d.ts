/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_GTM_CONTAINER_ID: string;
}
