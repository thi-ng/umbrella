// SPDX-License-Identifier: Apache-2.0
import { isArray } from "@thi.ng/checks/is-array";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import type { ColumnSpec } from "../api.js";

/** @internal */
export const __validateValue = (spec: ColumnSpec, x: any) =>
	(x == null && (spec.cardinality[0] === 0 || spec.default != null)) ||
	(spec.type === "str" ? isString(x) : isNumber(x));

/** @internal */
export const __validateArrayValue = (spec: ColumnSpec, x: any) => {
	const [min, max] = spec.cardinality;
	return (
		(x == null && (min === 0 || spec.default != null)) ||
		(isArray(x) &&
			x.length >= min &&
			x.length <= max &&
			x.every(spec.type === "str" ? isString : isNumber))
	);
};
