import type { Fn, Fn2 } from "@thi.ng/api";
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import { iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { mapcatIndexed } from "@thi.ng/transducers/mapcat-indexed";
import { push } from "@thi.ng/transducers/push";
import { some } from "@thi.ng/transducers/some";
import { transduce } from "@thi.ng/transducers/transduce";
import type { Domain, PlotFn } from "../api.js";
import { valueMapper } from "./utils.js";

export interface StackedIntervalOpts<T> {
	/**
	 * Arbitrary attributes to assign to the root diagram group.
	 */
	attribs?: any;
	/**
	 * Function which computes/extracts an item's domain interval [start,end]
	 */
	interval: Fn<T, number[]>;
	/**
	 * Number of domain units added to the end of each item's interval when
	 * checking for overlaps with other items. If an overlap occurs one of the
	 * items is being pushed to a new lane/row.
	 */
	overlap: number;
	/**
	 * Custom comparator to control order of item appearance in the diagram. By
	 * default sort order is based on the start value of an item's interval.
	 */
	sort?: Fn2<[number[], T], [number[], T], number>;
	/**
	 * Shape function to represent an item in the diagram as thi.ng/hiccup
	 * compatible shape/element.
	 */
	shape: Fn2<[number[], number[], T, number], Fn<number[], number[]>, any>;
}

type Lane<T> = [number[], T][];

const overlap = ([a, b]: number[], [c, d]: number[], pad = 0) =>
	a <= d + pad && b + pad >= c;

const laneStacking = <T>(data: [number[], T][], pad = 0) =>
	data.reduce((acc, item) => {
		const rx = item[0];
		for (let i = 0; true; i++) {
			const row = acc[i];
			if (!row || !some((y) => overlap(rx, y[0], pad), row)) {
				row ? row.push(item) : (acc[i] = [item]);
				return acc;
			}
		}
	}, <Lane<T>[]>[]);

const processLane =
	<T>(mapper: Fn<number[], number[]>, [d1, d2]: Domain) =>
	(i: number, row: Lane<T>) =>
		map(
			([[a, b], item]) =>
				<[number[], number[], T, number]>[
					mapper([Math.max(d1, a), i]),
					mapper([Math.min(d2, b), i]),
					item,
					i,
				],
			row
		);

export const stackedIntervals =
	<T>(data: T[], opts: StackedIntervalOpts<T>): PlotFn =>
	(spec) => {
		const mapper = valueMapper(spec.xaxis, spec.yaxis, spec.project);
		const domain = spec.xaxis.domain;
		const lanes = laneStacking(
			transduce(
				comp(
					map((x) => <[number[], T]>[opts.interval(x), x]),
					filter(([x]) => overlap(domain, x, opts.overlap))
				),
				push<[number[], T]>(),
				data
			).sort(opts.sort || ((a, b) => a[0][0] - b[0][0])),
			opts.overlap
		);
		return [
			"g",
			{ ...opts.attribs, "data-num-lanes": lanes.length },
			...iterator(
				comp(
					mapcatIndexed(processLane<T>(mapper, domain)),
					map((x) => opts.shape(x, mapper))
				),
				lanes
			),
		];
	};
