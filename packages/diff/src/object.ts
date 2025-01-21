// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Nullable, Predicate2 } from "@thi.ng/api";
import { equiv } from "@thi.ng/equiv";
import type { ObjectDiff } from "./api.js";

export const diffObject = <T>(
	a: Nullable<IObjectOf<T>>,
	b: Nullable<IObjectOf<T>>,
	mode: "full" | "only-distance" = "full",
	_equiv: Predicate2<any> = equiv
): ObjectDiff<T> =>
	a === b
		? { distance: 0 }
		: mode === "only-distance"
		? __diffObjectDist(a, b, _equiv)
		: __diffObjectFull(a, b, _equiv);

/** @internal */
const __diffObjectDist = (
	a: Nullable<IObjectOf<any>>,
	b: Nullable<IObjectOf<any>>,
	_equiv: Predicate2<any>
) => {
	if (!a) a = {};
	if (!b) b = {};
	let d = 0;
	for (let k in a) {
		const vb = b[k];
		(vb === undefined || !_equiv(a[k], vb)) && d++;
	}
	for (let k in b) {
		!(k in a) && d++;
	}
	return { distance: d };
};

/** @internal */
const __diffObjectFull = (
	a: Nullable<IObjectOf<any>>,
	b: Nullable<IObjectOf<any>>,
	_equiv: Predicate2<any>
) => {
	if (!a) a = {};
	if (!b) b = {};
	let d = 0;
	const adds = [];
	const dels = [];
	const edits = [];
	for (let k in a) {
		const vb = b[k];
		if (vb === undefined) {
			dels.push(k);
			d++;
		} else if (!_equiv(a[k], vb)) {
			edits.push(k, vb);
			d++;
		}
	}
	for (let k in b) {
		if (!(k in a)) {
			adds.push(k);
			d++;
		}
	}
	return { distance: d, adds, dels, edits };
};
