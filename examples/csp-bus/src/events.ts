import { consumeWith, pubsub } from "@thi.ng/csp";
import { range, wait } from "@thi.ng/transducers-async";
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
		async ([_, counter]) => {
			// trigger a logging event (see handler further below)
			bus.write(["log", `starting counter #${counter.id}`]);
			// temporarily disable the counter button
			counter.disabled.write(true);
			// animate
			for await (let i of range(101, counter.delay)) {
				await counter.value.write(i);
			}
			await wait(250);
			for await (let i of range(100, -1, -10, 10)) {
				await counter.value.write(i);
			}
			// re-enable counter button
			counter.disabled.write(false);
			// another logging event
			bus.write(["log", `counter #${counter.id} done`]);
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
		logger.write(msg)
	);

	bus.write(["log", "eventbus ready..."]);

	return bus;
};
