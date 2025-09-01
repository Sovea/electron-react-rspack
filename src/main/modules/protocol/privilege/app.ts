import { DEV_PORT } from 'configs/rspack/constant';
import { net, protocol } from 'electron';
import { getPort } from '@/common/utils/app';

/**
 * Handle requests to the 'app' scheme
 */
export function handleAppSchema() {
  protocol.handle('app', (request) => {
    const { host, pathname } = new URL(request.url);
    switch (host) {
      case 'bundle': {
        return net.fetch(
          `http://localhost:${isDev ? DEV_PORT : getPort()}${pathname}`,
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
