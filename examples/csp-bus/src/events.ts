// SPDX-License-Identifier: Apache-2.0
import type { Fn2 } from "@thi.ng/api";
import { Channel, consumeWith, into, pubsub } from "@thi.ng/csp";
import { FMT_HHmmss, FMT_yyyyMMdd } from "@thi.ng/date";
import { concat, delayed, range } from "@thi.ng/transducers-async";
import type {
	App,
	Event,
	LogEvent,
	StartCounterEvent,
	StopAllEvent,
} from "./api";

// the event bus is a simple wrapper for a pubsub CSP channel construct. events
// are triggered by writing a new value to the pubsub
//
// event handlers (further below) are subscribing to specific topics (aka event
// IDs) via filtered topic based CSP channels created by the pubsub. each
// handler is running in its own channel consumer... the topic function used
// here for the pubsub simply extracts the event name from incoming event tuples
// (see event type definitions in /api.ts)
export class EventBus {
	protected bus = pubsub<Event>((x) => x[0]);

	/**
	 * Trigger a new event by writing it to the internal pubsub.
	 *
	 * @param event
	 */
	emit<T extends Event>(event: T) {
		return this.bus.write(event);
	}

	/**
	 * Close the event bus. This will cause any future event triggers (via
	 * {@link EventBus.emit}) being ignored.
	 */
	close() {
		return this.bus.close();
	}

	/**
	 * Attach a new event listener for a specific event `id`. The handler
	 * function receives both the event and the channel it was received on,
	 * allowing this channel to be used in any way (e.g. to close it and
	 * therefore unsubscribe from this specific event type).
	 *
	 * @param id
	 * @param fn
	 */
	addListener<T extends Event>(id: string, fn: Fn2<T, Channel<T>, void>) {
		return consumeWith(this.bus.subscribeTopic<T>(id), fn);
	}
}

export const initEvents = async ({ logger }: App) => {
	const bus = new EventBus();

	// async event handler & channel consumer to handle counter events in the
	// form: `["start-counter", counterInstance]`
	// create a topic subscription channel for this specific event type
	bus.addListener<StartCounterEvent>(
		"start-counter",
		// this function is called for side effects of each counter event received,
		// we make it async here to simplify animating the counter
		async ([_, { value, disabled, id, delay }]) => {
			// we *could* use the logger directly here, but instead utilize the
			// bus for demo purposes and trigger a logging event (its handler is
			// further below)
			bus.emit(["log", `starting counter #${id}`]);
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
			bus.emit(["log", `counter #${id} done`]);
		}
	);

	// to avoid direct dependencies on the logger in other parts of the app
	// enable logging via sending events to the bus
	bus.addListener<LogEvent>("log", async ([_, msg]) =>
		logger.write(`${FMT_yyyyMMdd()} ${FMT_HHmmss()}: ${msg}`)
	);

	// stop the entire event bus if the `stop` event has been triggered. once
	// the bus channel is closed, all further events will be ignored and all
	// topic subscriptions should have been closed too (automatically)
	bus.addListener<StopAllEvent>("stop", async () => {
		await bus.emit(["log", "stopping event bus..."]);
		bus.close();
	});

	bus.emit(["log", "eventbus ready..."]);

	return bus;
};
