// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isBoolean } from "@thi.ng/checks/is-boolean";
import { isNumber } from "@thi.ng/checks/is-number";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { utf8Length } from "@thi.ng/strings/utf8";
import type { BinStructItem } from "@thi.ng/transducers-binary";
import { bytes, str, u8, u8array } from "@thi.ng/transducers-binary/bytes";
import { mapcat } from "@thi.ng/transducers/mapcat";

/** @internal */
const FLOAT_RE = /^[0-9.-]+$/;

/** @internal */
const ENCODERS: Record<
	"f" | "i" | "s" | "b" | "d" | "l",
	Fn<any, BinStructItem[]>
> = {
	i: (x: number) => {
		__ensureValidNumber(x);
		return [str(`i${Math.floor(x)}e`)];
	},

	f: (x: number) => {
		__ensureValidNumber(x);
		assert(
			FLOAT_RE.test(x.toString()),
			`values requiring exponential notation not allowed (${x})`
		);
		return [str(`f${x}e`)];
	},

	b: (buf: Uint8Array) => [str(buf.length + ":"), u8array(buf)],

	s: (x: string) => [str(utf8Length(x) + ":" + x)],

	l: (x: Iterable<any>) => [u8(0x6c), ...mapcat(__encodeBin, x), u8(0x65)],

	d: (x: any) => [
		u8(0x64),
		...mapcat(
			(k: string) => __encodeBin(k).concat(__encodeBin(x[k])),
			Object.keys(x).sort()
		),
		u8(0x65),
	],
};

export const encode = (x: any, cap = 1024) => bytes(cap, __encodeBin(x));

/** @internal */
const __encodeBin = (x: any) =>
	ENCODERS[
		isNumber(x)
			? Math.floor(x) !== x
				? "f"
				: "i"
			: isBoolean(x)
			? "i"
			: isString(x)
			? "s"
			: x instanceof Uint8Array
			? "b"
			: isPlainObject(x)
			? "d"
			: isArrayLike(x)
			? "l"
			: illegalArgs(`unsupported data type: ${x}`)
	](x);

/** @internal */
const __ensureValidNumber = (x: number) => {
	assert(isFinite(x), `can't encode infinite value`);
	assert(!isNaN(x), `can't encode NaN`);
};
