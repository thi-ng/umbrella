import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { neg } from "@thi.ng/vectors/neg";
import type { Arc } from "./api/arc.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Group } from "./api/group.js";
import type { Path } from "./api/path.js";
import type { Ray } from "./api/ray.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Function overrides for {@link flip}.
 */
export type FlipFn = {
	<T extends IShape>(shape: T): T;
} & MultiFn1<IShape, IShape>;

/**
 * Only for vertex-based shapes with implicit or explicit ordering. Reverses
 * vertex ordering or general direction (e.g. for {@link Ray}) of given shape.
 * In-place operation, modifies original shape.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link ComplexPolygon}
 * - {@link Cubic}
 * - {@link Cubic3}
 * - {@link Group} (only eligible shapes)
 * - {@link Group3} (only eligible shapes)
 * - {@link Line}
 * - {@link Line3}
 * - {@link Path} (currently a no-op)
 * - {@link Points}
 * - {@link Points3}
 * - {@link Polygon}
 * - {@link Polygon3}
 * - {@link Polyline}
 * - {@link Polyline3}
 * - {@link Quad}
 * - {@link Quad3}
 * - {@link Quadratic}
 * - {@link Quadratic3}
 * - {@link Ray}
 * - {@link Ray3}
 * - {@link Triangle}
 * - {@link Triangle3}
 *
 * @param shape
 */
export const flip = <FlipFn>defmulti<any, IShape>(
	__dispatch,
	{
		cubic: "$pclike",
		cubic3: "$pclike",
		line: "$pclike",
		line3: "$pclike",
		points: "$pclike",
		points3: "$pclike",
		poly: "$pclike",
		polyline: "$pclike",
		quad: "$pclike",
		quad3: "$pclike",
		quadratic: "$pclike",
		quadratic3: "$pclike",
		ray3: "ray",
		tri: "$pclike",
		tri3: "$pclike",
	},
	{
		[DEFAULT]: (x: IShape) => x,

		$pclike: ($: PCLike) => {
			$.points.reverse();
			return $;
		},

		arc: ($: Arc) => {
			const t = $.start;
			$.start = $.end;
			$.end = t;
			$.cw = !$.cw;
			return $;
		},

		complexpoly: ($: ComplexPolygon) => {
			flip($.boundary);
			for (let c of $.children) flip(c);
			return $;
		},

		group: ($: Group) => {
			$.children.forEach(flip);
			return $;
		},

		path: ($: Path) => {
			// TODO reverse segment order and each segment itself
			// How to determine initial `M` segment/start pos?
			// Disallow arcs (require normalizedPath())
			return $;
		},

		ray: ($: Ray) => {
			$.dir = neg(null, $.dir);
			return $;
		},
	}
);
