import type { MultiFn2 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape, IShape } from "@thi.ng/geom-api";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { Vec } from "@thi.ng/vectors";
import { Group } from "./api/group.js";
import { Polyline } from "./api/polyline.js";
import { asPolyline } from "./as-polyline.js";
import { __copyAttribsNoSamples as __attribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __pointArraysAsShapes } from "./internal/points-as-shape.js";

/**
 * Splits given shape into {@link Polyline} segments of given (max) arc length.
 * Returns array of new shapes/polylines.
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
 * Groups will be recursively processed (i.e. by calling {@link splitArcLength}
 * for each child). Any nested groups will be retained, but each group might
 * have a greater resulting number of children (depending on number of splits
 * performed).
 *
 * @param shape
 * @param dist
 */
export const splitArcLength: MultiFn2<IShape, number, IShape[]> = defmulti<
	any,
	number,
	IShape[]
>(
	__dispatch,
	{},
	{
		[DEFAULT]: ($: IShape, d: number) => splitArcLength(asPolyline($), d),

		group: ($, d) => [
			new Group(__attribs($), [
				...mapcat(
					(c: IShape) => <IHiccupShape[]>splitArcLength(c, d),
					$.children
				),
			]),
		],

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
			return __pointArraysAsShapes(Polyline, chunks, __attribs($))!;
		},
	}
);
