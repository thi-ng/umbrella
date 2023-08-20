import type { CommonOpts } from "./api.js";
import { toggle as $toggle } from "@thi.ng/transducers/toggle";
import { Subscription } from "./subscription.js";

/**
 * Returns a {@link Subscription} which toggles between true/false for each
 * {@link Subscription.next} call. The sub will be seeded with the given
 * `initial` value.
 *
 * @examples
 * ```ts
 * const mute = toggle(false);
 *
 * mute.subscribe(trace("mute"));
 * // mute false
 *
 * mute.next();
 * // mute true
 *
 * mute.next();
 * // mute false
 * ```
 *
 * @param initial
 * @param opts
 */
export function toggle(initial: boolean, opts?: Partial<CommonOpts>) {
	const sub = new Subscription<void, boolean>(undefined, {
		xform: $toggle(true, false, !initial),
		...opts,
	});
	sub.next();
	return sub;
}
