// SPDX-License-Identifier: Apache-2.0
import type { NumOrString } from "@thi.ng/api";
import { EMPTY, FLOAT, type BenchmarkFormatter } from "../api.js";

/** @internal */
const __n = (n: number, char = "-") => new Array(n).fill(char).join("");

/** @internal */
const __pad = (w: number) => {
	const column = __n(w, " ");
	return (x: NumOrString) => {
		const s = typeof x === "number" ? FLOAT(x) : x;
		return s.length < w
			? column.substring(0, w - s.length) + s
			: s.substring(0, w);
	};
};

/** @internal */
const __row = (cols: NumOrString[]) =>
	`|${cols.map((x, i) => COLUMNS[i](x)).join("|")}|`;

const C24 = __pad(24);
const C12 = __pad(12);
const C8 = __pad(8);

const D24 = __n(24);
const D12 = __n(11) + ":";
const D8 = __n(7) + ":";

const COLUMNS = [C24, C8, C8, C12, C12, C8, C8, C8, C8, C8, C8, C8];
const DASHES = [D24, D8, D8, D12, D12, D8, D8, D8, D8, D8, D8, D8];

export const FORMAT_MD: BenchmarkFormatter = {
	prefix: () =>
		__row([
			"Title",
			"Iter",
			"Size",
			"Total",
			"Frequency",
			"Mean",
			"Median",
			"Min",
			"Max",
			"Q1",
			"Q3",
			"SD%",
		]) + `\n|${DASHES.join("|")}|`,
	start: EMPTY,
	warmup: EMPTY,
	result: (res) =>
		__row([
			res.title,
			"" + res.iter,
			"" + res.size,
			res.total,
			res.freq,
			res.mean,
			res.median,
			res.min,
			res.max,
			res.q1,
			res.q3,
			res.sd,
		]),
	total: EMPTY,
	suffix: EMPTY,
};
