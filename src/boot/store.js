import { boot } from "quasar/wrappers";
import storeInstall from "../store";

export default boot(({ app }) => {
  app.use(typeof storeInstall === "function" ? storeInstall() : storeInstall);
});
