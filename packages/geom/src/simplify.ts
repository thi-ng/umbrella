import type { Maybe } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, IShape2, PathSegment2 } from "@thi.ng/geom-api";
import { simplify as _simplify } from "@thi.ng/geom-resample/simplify";
import type { Vec } from "@thi.ng/vectors";
import { ComplexPolygon } from "./api/complex-polygon.js";
import { Path } from "./api/path.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Function overrides for {@link simplify}.
 */
export type SimplifyFn = {
	<T extends IShape2>(shape: IShape2, eps?: number): T;
} & MultiFn1O<IShape, number, IShape>;

/**
 * Simplifies given 2D shape boundary using Douglas-Peucker algorithm
 * (implemented by
 * [`simplify()`](https://docs.thi.ng/umbrella/geom-resample/functions/simplify.html))
 * and given `threshold` distance (default: 1e-6, which removes only co-linear
 * vertices).
 *
 * @remarks
 * Currently only implemented for:
 *
 * - {@link ComplexPolygon}
 * - {@link Path}
 * - {@link Polygon}
 * - {@link Polyline}
 *
 * Use {@link asPath}, {@link asPolygon} or {@link asPolyline} to convert other
 * shape types first.
 *
 * @param shape
 * @param threshold
 */
export const simplify = <SimplifyFn>defmulti<any, Maybe<number>, IShape>(
	__dispatch,
	{},
	{
		complexpoly: ($: ComplexPolygon, eps?) =>
			new ComplexPolygon(
				<Polygon>simplify($.boundary, eps),
				$.children.map((child) => <Polygon>simplify(child, eps)),
				__copyAttribs($)
			),

		path: ($: Path, eps = 1e-6) => {
			const $simplifySegments = (segments: PathSegment2[]) => {
				const res: PathSegment2[] = [];
				const n = segments.length;
				let points!: Vec[] | null;
				let lastP!: Vec;
				for (let i = 0; i < n; i++) {
					const s = segments[i];
					if (s.type === "l" || s.type === "p") {
						points = points
							? points.concat(vertices(s.geo!))
							: vertices(s.geo!);
						lastP = peek(points);
					} else if (points) {
						points.push(lastP);
						res.push({
							geo: new Polyline(_simplify(points, eps)),
							type: "p",
						});
						points = null;
					} else {
						res.push({ ...s });
					}
				}
				if (points) {
					points.push(lastP);
					res.push({
						geo: new Polyline(points),
						type: "p",
					});
				}
				return res;
			};
			return new Path(
				$simplifySegments($.segments),
				$.subPaths.map($simplifySegments),
				__copyAttribs($)
			);
		},

		poly: ($: Polygon, eps = 1e-6) =>
			new Polygon(_simplify($.points, eps, true), __copyAttribs($)),

		polyline: ($: Polyline, eps = 1e-6) =>
			new Polyline(_simplify($.points, eps), __copyAttribs($)),
	}
);
