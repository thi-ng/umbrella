// SPDX-License-Identifier: Apache-2.0
// thing:export
import { mixin } from "@thi.ng/api/mixin";

/**
 * Implements Symbol.dispose functionality for given Set-like impl and its
 * values.
 *
 * @internal
 */
export const __disposableValues = mixin({
	[Symbol.dispose]() {
		console.log("disposing... %s", this);
		for (const x of this.values()) {
			x[Symbol.dispose]?.();
		}
	},
});

/**
 * Implements recursive Symbol.dispose functionality for given Map-like impl,
 * its keys and values.
 *
 * @internal
 */
export const __disposableEntries = mixin({
	[Symbol.dispose]() {
		console.log("disposing... %s", this);
		for (const [k, v] of this.entries()) {
			k[Symbol.dispose]?.();
			v[Symbol.dispose]?.();
		}
	},
});
