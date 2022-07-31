import type { NumOrString } from "@thi.ng/api";
import { BenchmarkFormatter, EMPTY, FLOAT } from "../api.js";

const $n = (n: number, char = "-") => new Array(n).fill(char).join("");

const pad = (w: number) => {
	const column = $n(w, " ");
	return (x: NumOrString) => {
		const s = typeof x === "number" ? FLOAT(x) : x;
		return s.length < w
			? column.substr(0, w - s.length) + s
			: s.substr(0, w);
	};
};

const c24 = pad(24);
const c12 = pad(12);
const c8 = pad(8);

const d24 = $n(24);
const d12 = $n(11) + ":";
const d8 = $n(7) + ":";

const COLUMNS = [c24, c8, c8, c12, c8, c8, c8, c8, c8, c8, c8];
const DASHES = [d24, d8, d8, d12, d8, d8, d8, d8, d8, d8, d8];

const row = (cols: NumOrString[]) =>
	`|${cols.map((x, i) => COLUMNS[i](x)).join("|")}|`;

export const FORMAT_MD: BenchmarkFormatter = {
	prefix: () =>
		row([
			"Title",
			"Iter",
			"Size",
			"Total",
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
		row([
			res.title,
			"" + res.iter,
			"" + res.size,
			res.total,
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
