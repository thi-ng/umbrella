import { memoizeJ } from "@thi.ng/memoize/memoizej";
import type { Stringer } from "./api.js";

type UnitDefs = [number, string, number?][];

export const units: (
	exp: UnitDefs,
	base: string,
	prec?: number
) => Stringer<number> = memoizeJ<
	UnitDefs,
	string,
	number | undefined,
	Stringer<number>
>((exp: UnitDefs, base: string, prec: number = 2) => {
	const groups = exp
		.map(
			(x) =>
				<[number, number, string]>[
					x[0],
					x[2] != null ? x[2] : prec,
					x[1],
				]
		)
		.sort((a, b) => a[0] - b[0]);
	return (x: number) => {
		if (x === 0) {
			return `0${base}`;
		}
		const absX = Math.abs(x);
		for (let i = groups.length; i-- > 0; ) {
			const g = groups[i];
			if (absX >= g[0] || i === 0) {
				return (x / g[0]).toFixed(g[1]) + g[2];
			}
		}
		return "";
	};
});

const KB = 1024;

export const bits = units(
	[
		[1, " bits", 0],
		[KB, " Kb"],
		[KB ** 2, " Mb"],
		[KB ** 3, " Gb"],
	],
	" bits",
	2
);

export const bytes = units(
	[
		[1, " bytes", 0],
		[KB, " KB"],
		[KB ** 2, " MB"],
		[KB ** 3, " GB"],
		[KB ** 4, " TB"],
		[KB ** 5, " PB"],
	],
	" bytes",
	2
);

export const seconds = units(
	[
		[1e-12, " ps"],
		[1e-9, " ns"],
		[1e-6, " µs"],
		[1e-3, " ms"],
		[1, " secs"],
		[60, " mins"],
		[60 * 60, " hours"],
		[24 * 60 * 60, " days"],
	],
	" secs",
	3
);

export const meters = units(
	[
		[1e-12, " pm"],
		[1e-9, " nm"],
		[1e-6, " µm"],
		[1e-3, " mm"],
		[1e-2, " cm"],
		[1, " m"],
		[1e3, " km"],
	],
	" m",
	2
);

export const grams = units(
	[
		[1e-12, " pg"],
		[1e-9, " ng"],
		[1e-6, " µg"],
		[1e-3, " mg"],
		[1, " g"],
		[1e3, " kg"],
		[1e6, " t"],
		[1e9, " kt"],
		[1e12, " Mt"],
	],
	" g",
	2
);

export const unitless = units(
	[
		[1e-15, "f", 1],
		[1e-12, "p", 1],
		[1e-9, "n", 1],
		[1e-6, "µ", 1],
		[1e-3, "m", 1],
		[1, ""],
		[1e3, "k", 1],
		[1e6, "M", 1],
		[1e9, "G", 1],
		[1e12, "T", 1],
		[1e15, "P", 1],
	],
	"",
	0
);
