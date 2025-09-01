import http from 'node:http';
import path from 'node:path';
import { app } from 'electron';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';
import { setPort } from '@/common/utils/app';

/**
 * start a static file server to serve the renderer files
 * @param callback start server callback
 */
export function startStaticServe(
  successCb?: () => void,
  errorCb?: (err: Error) => void,
) {
  const serve = serveStatic(path.join(app.getAppPath(), 'renderer'));

  const server = http.createServer(function onRequest(req, res) {
    serve(req, res, finalhandler(req, res));
  });

  server.listen(0, () => {
    const address = server.address();
    if (address && typeof address === 'object') {
      setPort(address.port);
      successCb?.();
    } else {
      errorCb?.(new Error('Failed to get server address'));
    }
  });
}
