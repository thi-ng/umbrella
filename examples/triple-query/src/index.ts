// SPDX-License-Identifier: Apache-2.0
import { exposeGlobal } from "@thi.ng/expose";
import { App } from "./app.js";
import { CONFIG } from "./config.js";

const APP = new App(CONFIG);
exposeGlobal("APP", APP);

APP.start();
