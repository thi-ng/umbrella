// SPDX-License-Identifier: Apache-2.0
import type { Fn0 } from "@thi.ng/api";

/** @internal */
const CACHE: Record<string, any> = Object.create(null);

/**
 * Lightweight named singleton factory, intended for hot-module replacement
 * situations. Takes a (preferably globally unique) `id` and `factory` function.
 * If there's no value defined for `id` yet, calls `factory` to produce the
 * singleton value and caches it. Returns singleton value.
 *
 * @remarks
 * Note: All created values will remain in the private cache until the JS
 * process terminates or this module itself has been reloaded (though the latter
 * shouldn't happen in an HMR workflow).
 *
 * For more control over memory usage, consider using other memoize functions in
 * this package with one of the available cache implementations from
 * [thi.ng/cache](https://thi.ng/cache).
 *
 * @param id -
 * @param factory -
 */
export const defOnce = <T>(id: string, factory: Fn0<T>): T =>
	id in CACHE ? CACHE[id] : (CACHE[id] = factory());
