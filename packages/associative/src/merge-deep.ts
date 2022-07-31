import type { IObjectOf, Nullable } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { meldObjWith, mergeObjWith } from "./merge-with.js";

export const mergeDeepObj = (
	dest: IObjectOf<any>,
	...xs: Nullable<IObjectOf<any>>[]
): any =>
	mergeObjWith(
		(a, b) =>
			isPlainObject(a) && isPlainObject(b) ? mergeDeepObj(a, b) : b,
		dest,
		...xs
	);

export const meldDeepObj = (
	dest: IObjectOf<any>,
	...xs: Nullable<IObjectOf<any>>[]
): any =>
	meldObjWith(
		(a, b) =>
			isPlainObject(a) && isPlainObject(b) ? meldDeepObj(a, b) : b,
		dest,
		...xs
	);
