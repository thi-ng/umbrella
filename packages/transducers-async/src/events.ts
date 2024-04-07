import type { Fn } from "@thi.ng/api";

/**
 * Attaches an event listener to given `target` and yields an async iterator of
 * events.
 *
 * @remarks
 * The event listener can be removed (and the iterator stopped) by sending
 * `yield iter.next(true)`.
 *
 * @param target
 * @param id
 * @param opts
 */
export async function* events<T extends Event = Event>(
	target: EventTarget,
	id: string,
	opts?: EventListenerOptions
): AsyncGenerator<T> {
	let resolve: Fn<Event, void>;
	const listener = (e: Event) => resolve(e);
	target.addEventListener(id, listener, opts);
	while (true) {
		const promise = new Promise(($resolve) => {
			resolve = $resolve;
		});
		const cancel = yield <T>await promise;
		if (cancel === true) break;
	}
	target.removeEventListener(id, listener, opts);
}
