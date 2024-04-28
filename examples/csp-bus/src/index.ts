import { defSystem } from "@thi.ng/system";
import type { App } from "./api.js";
import { initCounters } from "./counter.js";
import { initEvents } from "./events.js";
import { initLogger } from "./logger.js";
import { initUI } from "./ui.js";

// initialize the app components in dependency order
// see thi.ng/system readme for details
defSystem<App>({
	logger: { factory: initLogger },
	bus: { factory: initEvents, deps: ["logger"] },
	ui: { factory: initUI, deps: ["bus", "counters", "logger"] },
	counters: {
		factory: async ({ bus }) => initCounters([50, 10, 25], bus),
		deps: ["bus"],
	},
}).start();
