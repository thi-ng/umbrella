import type { IObjectOf } from "@thi.ng/api";
import { Atom } from "@thi.ng/atom";
import { toDot } from "@thi.ng/dgraph-dot";
import { CLOSE_OUTLINE, withSize } from "@thi.ng/hiccup-carbon-icons";
import { button, div, small } from "@thi.ng/hiccup-html";
import { ConsoleLogger, type ILogger, type LogLevelName } from "@thi.ng/logger";
import { deleteIn, getIn, setIn } from "@thi.ng/paths";
import { $compile, $klist } from "@thi.ng/rdom";
import { PubSub, fromAtom, pubsub } from "@thi.ng/rstream";
import { defSystem, type ILifecycle, type SystemMap } from "@thi.ng/system";
import { noop, sideEffect } from "@thi.ng/transducers";
import CONFIG from "./config.json?url";

// helper type to auto-complete event names
type EventID =
	| "add-counter"
	| "remove-counter"
	| "counter-done"
	| "inc-counter";

// events are just simple tuples
type Event =
	| ["add-counter", null]
	| ["remove-counter" | "inc-counter" | "counter-done", number];

type Bus = PubSub<Event, Event, EventID>;

// an app consists of a collection of system components. the actual system
// definition & initialization is near the end of this file
interface App {
	bus: Bus;
	config: Config;
	logger: ILogger;
	state: State;
	ui: ILifecycle<App>;
}

// the actual app config will be loaded from an external JSON file
interface Config {
	logLevel: LogLevelName;
	// if true, traces all events in the console
	traceEvents?: boolean;
	// list of CSS color class names (uses thi.ng/meta-css base framework)
	colors: string[];
	// max. number of counters
	maxCounters: number;
	// max. counter value
	maxValue: number;
}

// state of a single counter
interface Counter {
	id: number;
	value: number;
	color: string;
	done: boolean;
}

// using a thi.ng/rstream pubsub as central event bus, used by all components.
// it receives event tuples then allows multiple handlers to subscribe to each
// event type via `bus.subscribeTopic()` (see below). each topic (i.e. event
// type) can be obtained as separate rstream and processed & transformed via
// 100s of operators provided by the thi.ng/rstream & thi.ng/transducer pkgs
const eventBus = async ({ config, logger }: SystemMap<App>) => <Bus>pubsub({
		topic: (x) => x[0],
		xform: config.traceEvents
			? sideEffect((e) => logger.debug("event", e))
			: noop(),
	});

// app state will be stored in an atom container to which the UI will attach
// various subscriptions to perform reactive updates
class State extends Atom<IObjectOf<Counter>> implements ILifecycle {
	nextID = 0;

	constructor(
		protected config: Config,
		protected bus: Bus,
		protected logger: ILogger
	) {
		super({});
	}

	// define & register event handlers. the start() method will be invoked when
	// the overall system is started (after being initialized). components are
	// both initialized & started in dependency order, so by the time the UI
	// starts, all other dependent components (incl. this one) are ready to use
	async start() {
		this.bus.subscribeTopic("add-counter", {
			next: () => {
				const colors = this.config.colors;
				const id = this.nextID;
				this.nextID++;
				// store a new counter instance
				this.swap((state) =>
					setIn(state, [id], {
						id,
						value: 0,
						color: colors[id % colors.length],
						done: false,
					})
				);
				this.logger.info("new counter added, id:", id);
			},
		});
		this.bus.subscribeTopic("remove-counter", {
			next: ([_, id]) => {
				this.swap((state) => deleteIn(state, [id]));
				this.logger.info("counter removed, id:", id);
			},
		});
		this.bus.subscribeTopic("counter-done", {
			next: ([_, id]) => this.resetIn([id, "done"], true),
		});
		this.bus.subscribeTopic("inc-counter", {
			next: ([_, id]) => {
				if (
					getIn(this.deref(), [id, "value"]) >=
					this.config.maxValue - 1
				) {
					// delayed dispatch of `counter-done` event if max value is reached
					setTimeout(() => this.bus.next(["counter-done", id]), 250);
				}
				this.swapIn([id, "value"], (x) => x + 1);
			},
		});
		// return true to indicate this system component initialized successfully
		return true;
	}
}

// the UI is simply a collection of hiccup elements with some reactive wrappers
// & attributes. in order to participate in the system initialization, the
// component needs to implement the `ILifecycle` interface (i.e. start()/stop()
// methods), at least partially, as done here...
const UI = <ILifecycle<App>>{
	async start({ components: { config, bus, state } }) {
		// subscribe to state atom and convert to array (in predictable order)
		const counters = fromAtom(state).map((x) =>
			Object.values(x).sort((a, b) => a.id - b.id)
		);
		// derived sub (number of counters)
		const num = counters.map((x) => x.length);
		// compile & mount UI/DOM
		await $compile(
			div(
				{},
				div(
					".counter",
					{},
					button(
						".bg-color-green",
						{
							onclick: () => bus.next(["add-counter", null]),
							// reactive attribute to disable button if needed
							disabled: num.map((x) => x >= config.maxCounters),
						},
						"+ counter"
					)
				),
				// generic and reactive list wrapper component, subscribes to
				// `counters` and creates a counter UI component for each item
				$klist(
					counters,
					"div",
					{},
					(x) => counter(x, config, bus),
					// key function to determine if a counter state has changed
					(x) => `${x.id}-${x.value}-${x.done}`
				)
			)
		).mount(document.getElementById("app")!);
		return true;
	},
};

// UI component function for a single, removable counter
const counter = (
	{ id, value, color, done }: Counter,
	config: Config,
	bus: Bus
) =>
	div(
		`#counter${id}.counter${
			done ? ".item-hide" : !value ? ".item-show" : ""
		}`,
		{
			// if counter is done, dispatch `remove-counter` event once the UI
			// animation is finished. the counter will then be removed from the
			// state atom and the $klist() component wrapper will perform the
			// necessary DOM updates to reflect the change
			onanimationend: done
				? () => bus.next(["remove-counter", id])
				: undefined,
		},
		button(
			`.bg-color-${color}`,
			{
				// dispatch event to increase the counter
				onclick: () => bus.next(["inc-counter", id]),
				// disable if max value reached
				disabled: value >= config.maxValue,
			},
			small({}, `#${id} `),
			"·".repeat(value) + " " + value
		),
		// close button
		button(
			".close",
			{ onclick: () => bus.next(["counter-done", id]) },
			// close icon
			withSize(CLOSE_OUTLINE, "1rem")
		)
	);

// declare all system components and their dependencies
const app = defSystem<App>({
	// the event bus component depends on config & logger
	bus: {
		factory: eventBus,
		deps: ["config", "logger"],
	},
	// app config will be loaded from an external JSON file. this is the only
	// system component without dependencies, so it will be initialized before
	// all others...
	config: {
		factory: async () => {
			const response = await fetch(CONFIG);
			return await response.json();
		},
	},
	// we only use a console logger here, but this could be swapped with a
	// custom impl to do remote logging
	logger: {
		factory: async ({ config }) =>
			new ConsoleLogger("app", config.logLevel),
		deps: ["config"],
	},
	// the state requires the config, event bus and logger
	state: {
		factory: async ({ config, bus, logger }) =>
			new State(config, bus, logger),
		deps: ["bus", "config", "logger"],
	},
	// due to its dependencies the UI will be initialized last
	// (see visualization in readme)
	ui: {
		factory: async () => UI,
		deps: ["bus", "config", "state"],
	},
});

// initialize all components in topological order (determined by the `deps`
// given for each system component)
await app.start();

// optional: output the system graph as graphviz format
// see readme for generated diagram
console.log(toDot(app.graph, { id: (id) => id, attribs: { rankdir: "RL" } }));

// digraph g {
// rankdir="RL";
// "bus"[label="bus"];
// "config"[label="config"];
// "logger"[label="logger"];
// "state"[label="state"];
// "ui"[label="ui"];
// "bus" -> "config";
// "bus" -> "logger";
// "logger" -> "config";
// "state" -> "bus";
// "state" -> "config";
// "state" -> "logger";
// "ui" -> "bus";
// "ui" -> "config";
// "ui" -> "state";
// }
