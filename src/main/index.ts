import { app } from 'electron';
import { registerSchemesAsPrivileged } from './modules/protocol/privilege';
import { handleAppSchema } from './modules/protocol/privilege/app';
import { create } from './windows/index';

registerSchemesAsPrivileged();

app.whenReady().then(() => {
  handleAppSchema();
  create();
});
