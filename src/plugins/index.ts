/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import router from "../router";
import { permissionPlugin } from "./permissions";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(permissionPlugin).use(vuetify).use(router);
}
