import type { MultiFn1O } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { Attribs, IShape, PathSegment } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { copy } from "@thi.ng/vectors/copy";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import type { Polygon } from "./api/polygon.js";
import type { Polyline } from "./api/polyline.js";
import type { Rect } from "./api/rect.js";
import { asCubic } from "./as-cubic.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { pathFromCubics } from "./path.js";

/**
 * Converts given shape into a {@link Path} (by default via {@link asCubic} and
 * {@link pathFromCubics}).
 *
 * @remarks
 * The following shape types will be converted into paths consisting only of linear segments (NOT cubic beziers):
 *
 * - {@link ComplexPolygon}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @param src
 * @param attribs
 */
export const asPath: MultiFn1O<IShape, Attribs, IShape> = defmulti<
	any,
	Attribs | undefined,
	IShape
>(
	__dispatch,
	{ quad: "poly", tri: "poly" },
	{
		[DEFAULT]: (src: IShape, attribs?: Attribs) =>
			pathFromCubics(asCubic(src), attribs || __copyAttribs(src)),

		complexpoly: ($: ComplexPolygon, attribs) =>
			new Path(
				__lineSegments($.boundary.points, true),
				$.children.map((c) => __lineSegments(c.points, true)),
				attribs || __copyAttribs($)
			),

		poly: ($: Polygon, attribs) =>
			new Path(
				__lineSegments($.points, true),
				[],
				attribs || __copyAttribs($)
			),

		polyline: ($: Polyline, attribs) =>
			new Path(
				__lineSegments($.points, false),
				[],
				attribs || __copyAttribs($)
			),

		rect: ($: Rect, attribs) => {
			const max = $.max();
			return new Path(
				__lineSegments(
					[$.pos, [max[0], $.pos[1]], max, [$.pos[0], max[1]]],
					false
				),
				[],
				attribs || __copyAttribs($)
			);
		},
	}
);

const __lineSegments = (points: ReadonlyVec[], closed: boolean) => {
	if (!points.length) return [];
	const segments: PathSegment[] = [{ type: "m", point: copy(points[0]) }];
	for (let i = 1, n = points.length; i < n; i++)
		segments.push({
			type: "l",
			geo: new Line([copy(points[i - 1]), copy(points[i])]),
		});
	if (closed) segments.push({ type: "z" });
	return segments;
};
