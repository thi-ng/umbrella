import type { MultiFn2 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import type { Vec } from "@thi.ng/vectors";
import { Group } from "./api/group.js";
import { Polyline } from "./api/polyline.js";
import { asPolyline } from "./as-polyline.js";
import { __copyAttribsNoSamples as __attribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __pointArraysAsShapes } from "./internal/points-as-shape.js";

/**
 * Splits given shape into {@link Polyline} segments of given (max) arc length.
 * Returns a {@link Group} of shapes/polylines.
 *
 * @remarks
 * If the shape has a `__samples` attribute, it will be removed in the result to
 * avoid recursive application.
 *
 * Currently only implemented for:
 *
 * - {@link Group}
 * - {@link Polyline}
 *
 * Other shape types will be attempted to be auto-converted via
 * {@link asPolyline} first.
 *
 * Nested groups are NOT supported. Groups are processing their child shapes and
 * forming new child groups of given max. arc lengths and potentially splitting
 * shapes if they don't fit within the current subgroup...
 *
 * @example
 * ```ts
 * // circle (to be sampled as octagon)
 * const a = circle(100, { stroke: "red", __samples: 8 });
 *
 * // inner square of circle
 * const b = inscribedSquare(a, { stroke: "blue" });
 *
 * // process as group, split/partition into subgroups of arclength max. 200
 * splitArcLength(group({}, [a, b]), 200);
 * ```
 *
 * Result serialized to SVG:
 *
 * ```svg
 * <g>
 *   <g>
 *     <polyline fill="none" points="100,0 70.7,70.7 0.0,100 -43.4,82.0" stroke="red"/>
 *   </g>
 *   <g>
 *     <polyline fill="none" points="-43.4,82.0 -70.7,70.7 -100,0.0 -70.7,-70.7 -54.7,-77.3" stroke="red"/>
 *   </g>
 *   <g>
 *     <polyline fill="none" points="-54.7,-77.3 -0.0,-100 70.7,-70.7 95.3,-11.4" stroke="red"/>
 *   </g>
 *   <g>
 *     <!-- last segment of circle -->
 *     <polyline fill="none" points="95.3,-11.4 100,0" stroke="red"/>
 *     <!-- first segment of rect -->
 *     <polyline fill="none" points="-70.7,-70.7 70.7,-70.7 70.7,-24.4" stroke="blue"/>
 *   </g>
 *   <g>
 *     <polyline fill="none" points="70.7,-24.4 70.7,70.7 -34.2,70.7" stroke="blue"/>
 *   </g>
 *   <g>
 *     <polyline fill="none" points="-34.2,70.7 -70.7,70.7 -70.7,-70.7" stroke="blue"/>
 *   </g>
 * </g>
 * ```
 *
 * @param shape
 * @param dist
 */
export const splitArcLength: MultiFn2<IShape, number, Group> = defmulti<
	any,
	number,
	Group
>(
	__dispatch,
	{},
	{
		[DEFAULT]: ($: IShape, d: number) => splitArcLength(asPolyline($), d),

		group: ($: Group, d) => {
			const groups: Group[] = [];
			let curr: Polyline[] = [];
			let currLen = 0;

			const queue = $.children.slice().reverse();
			while (queue.length) {
				const child = queue.pop()!;
				const polyline = asPolyline(child);
				const sampler = new Sampler(polyline.points);
				const len = sampler.totalLength();
				if (currLen + len <= d) {
					curr.push(polyline);
					currLen += len;
				} else {
					const remainingLen = d - currLen;
					const [fill, next] = sampler.splitAt(remainingLen / len)!;
					curr.push(new Polyline(fill, __attribs(child)));
					groups.push(new Group({}, curr));
					curr = [];
					currLen = 0;
					queue.push(new Polyline(next, __attribs(child)));
				}
			}
			if (curr.length) groups.push(new Group({}, curr));
			return new Group(__attribs($), groups);
		},

		polyline: ($: Polyline, d) => {
			const chunks: Vec[][] = [];
			let pts = $.points;
			while (true) {
				const sampler = new Sampler(pts);
				const total = sampler.totalLength();
				if (total > d) {
					const parts = sampler.splitAt(d / total);
					if (!parts) break;
					chunks.push(parts[0]);
					pts = parts[1];
				} else {
					chunks.push(pts);
					break;
				}
			}
			return new Group(
				__attribs($),
				<any[]>__pointArraysAsShapes(Polyline, chunks)!
			);
		},
	}
);
