import { APP_SCHEMA_HOST } from '../constants/window';

/**
 * Constructs a URL for the app bundle path.
 * @param pathname - The path to append to the app schema bundle host.
 * @returns A string representing the full app bundle URL.
 */
export function getAppBundleUrl(pathname: string): string {
  return `app://${APP_SCHEMA_HOST.BUNDLE}/${pathname}`;
}
