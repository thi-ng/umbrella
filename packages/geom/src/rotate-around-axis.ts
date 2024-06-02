import type { MultiFn3 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape3, IShape3, PathSegment3 } from "@thi.ng/geom-api";
import { mulV33 } from "@thi.ng/matrices/mulv";
import { rotationAroundAxis33 } from "@thi.ng/matrices/rotation-around-axis";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { X3, Y3, Z3 } from "@thi.ng/vectors/api";
import { rotateAroundAxis3 } from "@thi.ng/vectors/rotate-around-axis";
import { Cubic3 } from "./api/cubic3.js";
import type { Group3 } from "./api/group3.js";
import { Line3 } from "./api/line3.js";
import { Path3 } from "./api/path3.js";
import { Points3 } from "./api/points3.js";
import { Polygon3 } from "./api/polygon3.js";
import { Polyline3 } from "./api/polyline3.js";
import { Quad3 } from "./api/quad3.js";
import { Quadratic3 } from "./api/quadratic3.js";
import { Ray3 } from "./api/ray3.js";
import { Triangle3 } from "./api/triangle3.js";
import { asPath } from "./as-path.js";
import { asPolygon } from "./as-polygon.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { __ensureNoArc } from "./internal/error.js";
import { __rotatedShape3 as tx } from "./internal/rotate.js";
import { __segmentTransformer } from "./internal/transform.js";

export type RotateAroundAxisFn = {
	<T extends IShape3>(shape: T, axis: ReadonlyVec, theta: number): T;
} & MultiFn3<IShape3, ReadonlyVec, number, IShape3>;

/**
 * Rotates given 3D shape by `theta` (in radians) around `axis`.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Cubic3}
 * - {@link Group3}
 * - {@link Polygon3}
 * - {@link Polyline3}
 * - {@link Line3}
 * - {@link Path3}
 * - {@link Points3}
 * - {@link Quad3}
 * - {@link Quadratic3}
 * - {@link Ray3}
 * - {@link Triangle3}
 *
 * @param shape
 * @param axis
 * @param theta
 */
export const rotateAroundAxis = <RotateAroundAxisFn>(
	defmulti<any, ReadonlyVec, number, IShape3>(
		__dispatch,
		{},
		{
			$aspath: ($: IShape3, axis, theta) =>
				rotateAroundAxis(asPath($), axis, theta),

			$aspoly: ($: IShape3, axis, theta) =>
				rotateAroundAxis(asPolygon($)[0], axis, theta),

			cubic3: tx(Cubic3),

			group3: ($: Group3, axis, theta) =>
				$.copyTransformed(
					(x) => <IHiccupShape3>rotateAroundAxis(x, axis, theta)
				),

			line3: tx(Line3),

			path3: ($: Path3, axis, theta) => {
				const mat = rotationAroundAxis33([], axis, theta);
				const $rotateSegments = __segmentTransformer<PathSegment3>(
					(geo) => {
						__ensureNoArc(geo);
						return rotateAroundAxis(geo, axis, theta);
					},
					(p) => mulV33([], mat, p)
				);
				return new Path3(
					$rotateSegments($.segments),
					$.subPaths.map($rotateSegments),
					__copyAttribs($.attribs)
				);
			},

			points3: tx(Points3),

			poly3: tx(Polygon3),

			polyline3: tx(Polyline3),

			quad3: tx(Quad3),

			quadratic3: tx(Quadratic3),

			ray3: ($: Ray3, axis, theta) => {
				return new Ray3(
					rotateAroundAxis3([], $.pos, axis, theta),
					rotateAroundAxis3([], $.dir, axis, theta),
					__copyAttribs($.attribs)
				);
			},

			tri: tx(Triangle3),
		}
	)
);

export const rotateX = (shape: IShape3, theta: number) =>
	rotateAroundAxis(shape, X3, theta);

export const rotateY = (shape: IShape3, theta: number) =>
	rotateAroundAxis(shape, Y3, theta);

export const rotateZ = (shape: IShape3, theta: number) =>
	rotateAroundAxis(shape, Z3, theta);
