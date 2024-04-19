import type { IDeref, Maybe } from "@thi.ng/api";
import type { ClosableAsyncGenerator } from "./api.js";
import { source } from "./source.js";

/**
 * Attaches an event listener to given `target` and yields an async iterator of
 * events.
 *
 * @remarks
 * The event listener can be removed (and the iterator stopped) by calling
 * `.close()`.
 *
 * @example
 * ```ts tangle:../export/events.ts
 * import { events, map, run } from "@thi.ng/transducers-async";
 *
 * const resize = events(window, "resize");
 *
 * const sizes = map(
 *   (e) => [window.innerWidth, window.innerHeight],
 *   resize
 * );
 *
 * for await (let [w, h] of sizes) {
 *   console.log(w, h)
 * }
 *
 * // to stop listening and stop iterator
 * resize.close();
 * ```
 *
 * @param target
 * @param id
 * @param opts
 */
export const events = <T extends Event = Event>(
	target: EventTarget,
	id: string,
	opts?: EventListenerOptions
): ClosableAsyncGenerator<T> & IDeref<Maybe<T>> => {
	const listener = (e: Event) => gen.reset(<T>e);
	target.addEventListener(id, listener, opts);
	const gen = source<T>();
	gen.close = () => {
		target.removeEventListener(id, listener, opts);
		gen.reset(undefined);
	};
	return gen;
};
