// SPDX-License-Identifier: Apache-2.0
import type { MultiFn3 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { mulV33 } from "@thi.ng/matrices/mulv";
import { rotationAroundAxis33 } from "@thi.ng/matrices/rotation-around-axis";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { X3, Y3, Z3 } from "@thi.ng/vectors/api";
import { rotateAroundAxis3 } from "@thi.ng/vectors/rotate-around-axis";
import type { IHiccupShape3, IShape3, PathSegment3 } from "./api.js";
import type { Group3 } from "./api/group3.js";
import type { Path3 } from "./api/path3.js";
import type { Points3 } from "./api/points3.js";
import { Ray3 } from "./api/ray3.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
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
		{
			cubic3: "points3",
			line3: "points3",
			poly3: "points3",
			polyline3: "points3",
			quad3: "points3",
			quadratic3: "points3",
			tri3: "points3",
		},
		{
			group3: ($: Group3, axis, theta) =>
				$.copyTransformed(
					(x) => <IHiccupShape3>rotateAroundAxis(x, axis, theta)
				),

			path3: ($: Path3, axis, theta) => {
				const mat = rotationAroundAxis33([], axis, theta);
				return $.copyTransformed(
					__segmentTransformer<PathSegment3>(
						(geo) => rotateAroundAxis(geo, axis, theta),
						(p) => mulV33([], mat, p)
					)
				);
			},

			points3: ($: Points3, axis, theta) => {
				const mat = rotationAroundAxis33([], axis, theta);
				return $.copyTransformed((points) =>
					points.map((p) => mulV33([], mat, p))
				);
			},

			ray3: ($: Ray3, axis, theta) => {
				return new Ray3(
					rotateAroundAxis3([], $.pos, axis, theta),
					rotateAroundAxis3([], $.dir, axis, theta),
					__copyAttribs($.attribs)
				);
			},
		}
	)
);

export const rotateX = (shape: IShape3, theta: number) =>
	rotateAroundAxis(shape, X3, theta);

export const rotateY = (shape: IShape3, theta: number) =>
	rotateAroundAxis(shape, Y3, theta);

export const rotateZ = (shape: IShape3, theta: number) =>
	rotateAroundAxis(shape, Z3, theta);
