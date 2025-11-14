// SPDX-License-Identifier: Apache-2.0
// thing:export
import { mixin } from "@thi.ng/api/mixin";
import { map } from "@thi.ng/transducers/map";

/** @internal */
const __tostringSet = (x: Set<any>) =>
	[
		`${x[Symbol.toStringTag]}(${x.size || 0}) {`,
		[...x].map((x) => __tostring(x)).join(", "),
		"}",
	].join(" ");

/** @internal */
const __tostringMap = (x: Map<any, any>) =>
	[
		`${x[Symbol.toStringTag]}(${x.size || 0}) {`,
		[...map(([k, v]) => `${__tostring(k)} => ${__tostring(v)}`, x)].join(
			", "
		),
		"}",
	].join(" ");

/** @internal */
const __tostring = (x: any): string => {
	return x instanceof Set
		? __tostringSet(x)
		: x instanceof Map
		? __tostringMap(x)
		: JSON.stringify(x);
};

/**
 * Set/Map .toString() impl
 *
 * @internal
 */
export const __tostringMixin = mixin({
	toString() {
		return __tostring(this);
	},
});
