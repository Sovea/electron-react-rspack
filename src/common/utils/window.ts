import type { AppSchemaHost } from '@/types/window';
import { APP_SCHEMA_HOST } from '../constants/window';

/**
 * Constructs a URL with app schema.
 * @param host - The host in app schema.
 * @param pathname - The path to append to the app schema and the target host.
 * @returns App Schema URL.
 */
export function getAppSchemaUrl(host: AppSchemaHost, pathname: string): string {
  return `app://${host}/${pathname}`;
}

/**
 * Constructs a URL with app bundled page path.
 * @param pathname - The path to append to the app schema page host.
 * @returns App bundled page URL.
 */
export function getAppPageUrl(pathname: string): string {
  return getAppSchemaUrl(APP_SCHEMA_HOST.PAGE, pathname);
}
