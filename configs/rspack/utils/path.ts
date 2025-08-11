import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * A helper function to get the __filename and __dirname equivalents in ES Modules.
 * @param importMetaUrl - Pass `import.meta.url` from the calling file.
 * @returns An object containing the file path and directory path.
 */
export function getEnvPaths(importMetaUrl: string) {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = dirname(__filename);
  return { __filename, __dirname };
}
