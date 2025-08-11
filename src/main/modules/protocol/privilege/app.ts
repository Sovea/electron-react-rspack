import { DEV_PORT } from 'configs/rspack/constant';
import { net, protocol } from 'electron';

/**
 * Handle requests to the 'app' scheme
 */
export function handleAppSchema() {
  protocol.handle('app', (request) => {
    const { host, pathname } = new URL(request.url);
    switch (host) {
      case 'bundle': {
        if (isDev) {
          return net.fetch(`http://localhost:${DEV_PORT}${pathname}`);
        }
        return new Response('bad Request', {
          status: 400,
          headers: { 'content-type': 'text/html' },
        });
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
