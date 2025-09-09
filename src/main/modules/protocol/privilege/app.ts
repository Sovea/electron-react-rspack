import { DEV_PORT } from 'configs/rspack/constant';
import { net, protocol } from 'electron';
import { getPort } from '@/common/utils/app';
import type { AppSchemaHost } from '@/types/window';

/**
 * Handle requests to the 'app' scheme
 */
export function handleAppSchema() {
  protocol.handle('app', (request) => {
    const { host, pathname } = new URL(request.url);
    switch (host as AppSchemaHost) {
      case 'page': {
        return net.fetch(
          `http://localhost:${isDev ? DEV_PORT : getPort()}${isDev ? '' : '/renderer'}${pathname}`,
        );
      }
      default: {
        return new Response('bad Request', {
          status: 400,
          headers: { 'content-type': 'text/html' },
        });
      }
    }
  });
}
