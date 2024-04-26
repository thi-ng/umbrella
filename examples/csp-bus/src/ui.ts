import { button, div, textArea } from "@thi.ng/hiccup-html";
import { $compile } from "@thi.ng/rdom";
import { slidingWindow } from "@thi.ng/transducers";
import { comp, iterator, map } from "@thi.ng/transducers-async";
import type { App } from "./api.js";

// main thi.ng/rdom UI component tree initialization
export const initUI = async ({ bus, counters, logger }: App) => ({
	async start() {
		$compile(
			div(
				{},
				counters,
				button(
					".stop",
					{ onclick: () => bus.write(["stop"]) },
					"stop event bus"
				),
				textArea({
					disabled: true,
					rows: 10,
					// keep a sliding window of last 10 log messages. this
					// overall value construct is actually an async iterable.
					// this works because CSP channels implement the ES
					// `[Symbol.asyncIterator]()` interface and that way we can
					// use them as data source for async transducers to
					// transform values (e.g. as shown here)...
					// Note: thi.ng/rdom currently only has partial support
					// for async interables (see pkg readme for details)
					value: iterator(
						comp(
							slidingWindow(10),
							map((x) => x.join("\n"))
						),
						logger
					),
				})
			)
		).mount(document.getElementById("app")!);
		return true;
	},
});
