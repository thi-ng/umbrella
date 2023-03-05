import { defAtom } from "@thi.ng/atom";
import { start } from "@thi.ng/hdom";
import {
	dispatchNow,
	EventBus,
	FX_STATE,
	valueUpdater,
} from "@thi.ng/interceptors";
import { choices } from "@thi.ng/transducers";

// infinite iterator of random color choices
const colors = choices(["cyan", "yellow", "magenta", "chartreuse"]);

// central app state (initially empty)
const db = defAtom({});

// event bus w/ handlers
// see @thi.ng/interceptors for more details
const bus = new EventBus(db, {
	init: () => ({
		[FX_STATE]: { clicks: 0, color: "grey" },
	}),
	"inc-counter": [
		valueUpdater("clicks", (x: number) => x + 1),
		dispatchNow(["randomize-color"]),
	],
	"randomize-color": valueUpdater("color", () => colors.next().value),
});

start(
	// this root component function will be executed via RAF.
	// it first processes events and then only returns an updated
	// component if there was a state update...
	(ctx: any) =>
		ctx.bus.processQueue()
			? [
					"button",
					{
						style: {
							padding: "1rem",
							background: ctx.db.value.color,
						},
						onclick: () => ctx.bus.dispatch(["inc-counter"]),
					},
					`clicks: ${ctx.db.value.clicks}`,
			  ]
			: null,
	// hdom options incl.
	// arbitrary user context object passed to all components
	{ ctx: { db, bus } }
);

// kick off
bus.dispatch(["init"]);
