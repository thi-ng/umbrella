// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { MultiFn3O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import {
	KERNEL_BOX as $BOX,
	KERNEL_GAUSSIAN as $GAUSSIAN,
	KERNEL_TRIANGLE as $TRIANGLE,
	convolveClosed,
	convolveOpen,
} from "@thi.ng/geom-poly-utils/convolve";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { ICopyTransformed, IShape, IShape2, IShape3 } from "./api.js";
import type { ComplexPolygon } from "./api/complex-polygon.js";
import type { Group } from "./api/group.js";
import type { Group3 } from "./api/group3.js";
import type { Polygon } from "./api/polygon.js";
import type { Polygon3 } from "./api/polygon3.js";
import type { Polyline } from "./api/polyline.js";
import type { Polyline3 } from "./api/polyline3.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Function overrides for {@link convolve}.
 */
export type ConvoleFn = {
	(
		shape: ComplexPolygon,
		kernel: number[],
		t?: number,
		iter?: number
	): ComplexPolygon;
	(shape: Group, kernel: number[], t?: number, iter?: number): Group;
	(shape: Group3, kernel: number[], t?: number, iter?: number): Group3;
	(shape: Polygon, kernel: number[], t?: number, iter?: number): Polygon;
	(shape: Polygon3, kernel: number[], t?: number, iter?: number): Polygon3;
	(shape: Polyline, kernel: number[], t?: number, iter?: number): Polyline;
	(shape: Polyline3, kernel: number[], t?: number, iter?: number): Polyline3;
	<T extends IShape2>(
		shape: IShape2,
		kernel: number[],
		t?: number,
		iter?: number
	): T;
	<T extends IShape3>(
		shape: IShape3,
		kernel: number[],
		t?: number,
		iter?: number
	): T;
} & MultiFn3O<IShape, number[], number, number, IShape>;

/**
 * Convolves the vertices of `shape` with given `kernel` and returns updated
 * shape of same type. The kernel is applied symmetrical to each vertex and its
 * neighbors (i.e. neighbors on both sides).
 *
 *
 * @remarks
 * Implementations:
 *
 * - [`convolveClosed`](https://docs.thi.ng/umbrella/geom-poly-utils/functions/convolveClosed.html))
 * - [`convolveOpen`](https://docs.thi.ng/umbrella/geom-poly-utils/functions/convolveOpen.html))
 *
 * Currently only implemented for:
 *
 * - {@link ComplexPolygon}
 * - {@link Group} (if only containing supported shapes)
 * - {@link Group3} (if only containing supported shapes)
 * - {@link Polygon}
 * - {@link Polyline}
 *
 * Use {@link asPolygon} or {@link asPolyline} to convert other shape types
 * first.
 *
 * Available preset kernels:
 *
 * - {@link KERNEL_BOX}
 * - {@link KERNEL_TRIANGLE}
 * - {@link KERNEL_GAUSSIAN}
 *
 * @param shape
 * @param k
 * @param t
 */
export const convolve = <ConvoleFn>(
	defmulti<any, number[], Maybe<number>, Maybe<number>, IShape>(
		__dispatch,
		{
			complexpoly: "group",
			group3: "group",
			poly3: "poly",
			polyline3: "polyline",
		},
		{
			group: ($: Group, k, t, iter) =>
				$.copyTransformed((x) => convolve(x, k, t, iter)),

			poly: ($: Polygon, k, t, iter) =>
				__convolve(convolveClosed, $, k, t, iter),

			polyline: ($: Polyline, k, t, iter) =>
				__convolve(convolveOpen, $, k, t, iter),
		}
	)
);

/** @internal */
const __convolve = <T extends ICopyTransformed<ReadonlyVec[]>>(
	fn: typeof convolveClosed,
	$: T,
	kernel: number[],
	t?: number,
	iter?: number
) => $.copyTransformed((points) => fn(points, kernel, t, iter));

/**
 * Re-export of
 * [`KERNEL_BOX`](https://docs.thi.ng/umbrella/geom-poly-utils/variables/KERNEL_BOX.html).
 */
export const KERNEL_BOX = $BOX;
/**
 * Re-export of
 * [`KERNEL_TRIANGLE`](https://docs.thi.ng/umbrella/geom-poly-utils/variables/KERNEL_TRIANGLE.html).
 */
export const KERNEL_TRIANGLE = $TRIANGLE;
/**
 * Re-export of
 * [`KERNEL_GAUSSIAN`](https://docs.thi.ng/umbrella/geom-poly-utils/variables/KERNEL_GAUSSIAN.html).
 */
export const KERNEL_GAUSSIAN = $GAUSSIAN;
