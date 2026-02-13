// SPDX-License-Identifier: Apache-2.0
import {
	SIZEOF,
	typedArray,
	type NumericArray,
	type Type,
} from "@thi.ng/api/typedarray";
import type { BidirIndex } from "@thi.ng/bidir-index";
import { decodeBinary, encodeBinary } from "@thi.ng/rle-pack/binary";
import { decodeSimple, encodeSimple } from "@thi.ng/rle-pack/simple";
import { FLAG_RLE, type ColumnSpec } from "../api.js";

/** @internal */
export const __serializeDict = (dict: BidirIndex<any>) => {
	const res: any = [];
	for (let [val, id] of dict.entries()) res[id] = val;
	return { index: res, next: dict.nextID };
};

/** @internal */
export const __serializeTyped = (
	$values: NumericArray,
	spec: ColumnSpec,
	type: Type
) => {
	if (spec.flags & FLAG_RLE) {
		$values =
			type[0] === "f"
				? encodeSimple($values)
				: encodeBinary($values, $values.length, SIZEOF[type] * 8);
	}
	let values: any[] = Array.from($values);
	const prec = spec.opts?.prec;
	if (prec != null) values = values.map((x) => +x.toFixed(prec));
	return { values };
};

/** @internal */
export const __deserializeTyped = (
	type: Type,
	flags: number,
	values: number[]
) =>
	flags & FLAG_RLE
		? type[0] === "f"
			? typedArray(type, decodeSimple(values))
			: typedArray(type, decodeBinary(<any>values).buffer)
		: typedArray(type, values);
