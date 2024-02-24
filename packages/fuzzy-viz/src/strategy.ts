import type { Fn3, IClear, IDeref } from "@thi.ng/api";
import type { DefuzzStrategy, FuzzyFn, LVarDomain } from "@thi.ng/fuzzy";
import { variable } from "@thi.ng/fuzzy/var";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { serialize } from "@thi.ng/hiccup/serialize";
import { fit } from "@thi.ng/math/fit";
import { repeat } from "@thi.ng/strings/repeat";
import { barChartVLines } from "@thi.ng/text-canvas/bars";
import type { AsciiVizOpts, InstrumentFn, VizualizeVarOpts } from "./api.js";
import { varToHiccup } from "./var.js";

/**
 * Higher order function. Takes an existing
 * [`DefuzzStrategy`](https://docs.thi.ng/umbrella/fuzzy/types/DefuzzStrategy.html)
 * and an instrumentation function. Returns new `DefuzzStrategy` which first
 * executes original `strategy`, then calls `instrument` with the same args AND
 * the computed result obtained from `strategy`. Returns result of original
 * `strategy`.
 *
 * @remarks
 * The instrumentation function is intended to perform side effects (e.g. debug
 * outputs) and/or produce secondary results (e.g. visualizations). The latter
 * can be obtained through the
 * [`IDeref`](https://docs.thi.ng/umbrella/api/interfaces/IDeref.html) mechanism
 * implemented by the returned function. Since
 * [`defuzz()`](https://docs.thi.ng/umbrella/fuzzy/functions/defuzz.html) might
 * call the strategy multiple times (i.e. if there are multiple output vars
 * used), `.deref()` will always return an array of secondary results.
 *
 * Note: The secondary results from the instrumentation function will persist &
 * accumulate. If re-using the instrumented strategy for multiple `defuzz()`
 * invocations, it's highly recommended to clear any previous results using
 * `.clear()`.
 *
 * @example
 * ```ts
 * import { cogStrategy, gaussian } from "@thi.ng/fuzzy";
 * import { instrumentStrategy, fuzzySetToAscii } from "@thi.ng/fuzzy-viz";
 *
 * const strategy = instrumentStrategy(
 *   cogStrategy({ samples: 1000 }),
 *   fuzzySetToAscii({ width: 40, height: 8 })
 * );
 *
 * strategy(gaussian(5, 2), [0, 10]);
 * // 4.995
 *
 * console.log(strategy.deref()[0])
 * // .................▄▆█|█▆▄.................
 * // ...............▅████|████▅...............
 * // .............▄██████|██████▄.............
 * // ...........▂▇███████|███████▇▂...........
 * // ..........▅█████████|█████████▅..........
 * // .......▁▅███████████|███████████▅▁.......
 * // .....▃▆█████████████|█████████████▆▃.....
 * // ▃▄▅▇████████████████|████████████████▇▅▄▃
 * //                     ^ 5.00
 *
 * // cleanup (optional)
 * strategy.clear();
 * ```
 *
 * @param strategy -
 * @param instrument -
 */
export const instrumentStrategy = <T>(
	strategy: DefuzzStrategy,
	instrument: Fn3<FuzzyFn, LVarDomain, number, T>
) => {
	const acc: T[] = [];
	const impl: DefuzzStrategy & IClear & IDeref<T[]> = (fn, domain) => {
		const res = strategy(fn, domain);
		acc.push(instrument(fn, domain, res));
		return res;
	};
	impl.clear = () => (acc.length = 0);
	impl.deref = () => acc;
	return impl;
};

export const fuzzySetToHiccup =
	(opts?: Partial<VizualizeVarOpts>): InstrumentFn<any[]> =>
	(fn, domain, res) => {
		const tree = varToHiccup(variable(domain, { main: fn }), {
			labels: false,
			stroke: () => "#333",
			fill: () => "#999",
			...opts,
		});
		const { width, height } = tree[1];
		const x = fit(res, domain[0], domain[1], 0, width);
		tree.push([
			"g",
			{ translate: [x, 0] },
			["line", { stroke: "red" }, [0, 0], [0, height - 12]],
			[
				"text",
				{ align: "center", fill: "red" },
				[0, height - 2],
				res.toFixed(2),
			],
		]);
		return tree;
	};

export const fuzzySetToSvg =
	(opts?: Partial<VizualizeVarOpts>): InstrumentFn<string> =>
	(fn, domain, res) =>
		serialize(convertTree(fuzzySetToHiccup(opts)(fn, domain, res)));

export const fuzzySetToAscii =
	(opts: Partial<AsciiVizOpts> = {}): InstrumentFn<string> =>
	(fn, domain, res) => {
		const { width = 100, height = 16, empty = "." } = opts;
		const [min, max] = domain;
		const delta = (max - min) / width;
		const vals: number[] = [];
		for (let i = min; i <= max; i += delta) {
			vals.push(fn(i));
		}
		const index = Math.round(fit(res, min, max, 0, vals.length));
		let chart = barChartVLines(height, vals, 0, 1)
			.map(
				(line) =>
					line.substring(0, index) + "|" + line.substring(index + 1)
			)
			.join("\n")
			.replace(/ /g, empty);
		const legend = repeat(" ", index) + "^ " + res.toFixed(2);
		return chart + "\n" + legend;
	};
