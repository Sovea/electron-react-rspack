import type { APP_SCHEMA_HOST } from '@/common/constants/window';

/**
 * Host for the app schema.
 */
export type AppSchemaHost =
  (typeof APP_SCHEMA_HOST)[keyof typeof APP_SCHEMA_HOST];
