import { App } from "./app";
import { CONFIG } from "./config";

// export app to global var in dev mode
// (for interaction via browser dev tools)
if (process.env.NODE_ENV == "development") {
    (window["APP"] = new App(CONFIG)).start();
} else {
    new App(CONFIG).start();
}

window["equiv"] = require("@thi.ng/equiv").equiv;