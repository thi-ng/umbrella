import type { Fn0 } from "@thi.ng/api";

const cache: any = {};

/**
 * Lightweight named singleton factory, intended for hot-module
 * replacement situations. Takes a (preferably globally unique) `id` and
 * `factory` function. If there's no value defined for `id` yet, calls
 * `factory` to produce the singleton value and caches it. Returns
 * singleton value.
 *
 * Note: All created values will remain in the private cache until the
 * JS process terminates or this module itself has been reloaded (though
 * the latter shouldn't happen in an HMR workflow).
 *
 * @param id -
 * @param factory -
 */
export const defonce = <T>(id: string, factory: Fn0<T>): T =>
	cache.hasOwnProperty(id) ? cache[id] : (cache[id] = factory());
