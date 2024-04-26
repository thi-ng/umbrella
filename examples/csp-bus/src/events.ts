import { consumeWith, into, pubsub } from "@thi.ng/csp";
import { FMT_HHmmss, FMT_yyyyMMdd } from "@thi.ng/date";
import { concat, delayed, range } from "@thi.ng/transducers-async";
import type {
	App,
	Event,
	EventBus,
	LogEvent,
	StartCounterEvent,
	StopAllEvent,
} from "./api";

export const initEvents = async ({ logger }: App) => {
	// the event bus is a simple pubsub CSP channel construct
	// events are triggered by writing a new value in this channel

	// event handlers (below) are subscribing to specific topics (via filtered
	// topic based CSP channels) and each handler is running in its own channel
	// consumer... the topic function used here simply extracts the event name
	// from incoming event tuples (see event definition in /api.ts)
	const bus: EventBus = pubsub<Event>((x) => x[0]);

	// async event handler & channel consumer to handle counter events in the
	// form: `["start-counter", counterInstance]`
	consumeWith(
		// create a topic subscription channel for this specific event type
		bus.subscribeTopic<StartCounterEvent>("start-counter"),
		// this function is called for side effects of each counter event received,
		// we make it async here to simplify animating the counter
		async ([_, { value, disabled, id, delay }]) => {
			// we *could* use the logger directly here, but instead utilize the
			// bus for demo purposes and trigger a logging event (its handler is
			// further below)
			bus.write(["log", `starting counter #${id}`]);
			// temporarily disable the counter button
			disabled.write(true);
			// animate by feeding an async iterable into the counter's value channel
			await into(
				value,
				// concatenate multiple async iterables to animate value
				concat(
					// count [0..100]
					range(101, delay),
					// short wait
					(async function* () {
						yield await delayed(100, 500);
					})(),
					// (faster) countdown to 0
					range(100, -1, -10, 10)
				)
			);
			// re-enable counter button
			disabled.write(false);
			// another logging event
			bus.write(["log", `counter #${id} done`]);
		}
	);

	// stop the entire event bus if the `stop` event has been triggered. once
	// the bus channel is closed, all further events will be ignored and all
	// topic subscriptions should have been closed too (automatically)
	consumeWith(bus.subscribeTopic<StopAllEvent>("stop"), async () => {
		await bus.write(["log", "stopping event bus..."]);
		bus.close();
	});

	// to avoid direct dependencies on the logger in other parts of the app
	// enable logging via sending events to the bus
	consumeWith(bus.subscribeTopic<LogEvent>("log"), ([_, msg]) =>
		logger.write(`${FMT_yyyyMMdd()} ${FMT_HHmmss()}: ${msg}`)
	);

	bus.write(["log", "eventbus ready..."]);

	return bus;
};
