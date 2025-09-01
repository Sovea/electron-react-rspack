import { app } from 'electron';
import { registerSchemesAsPrivileged } from './modules/protocol/privilege';
import { handleAppSchema } from './modules/protocol/privilege/app';
import { startStaticServe } from './modules/serve/app';
import { create } from './windows/index';

registerSchemesAsPrivileged();

app.whenReady().then(() => {
  if (isDev) {
    handleAppSchema();
    create();
  } else {
    startStaticServe(() => {
      handleAppSchema();
      create();
    });
  }
});
