import type { Maybe } from "@thi.ng/api";
import type { MultiFn3O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type {
	IShape,
	IShape2,
	IShape3,
	PCLike,
	PCLikeConstructor,
} from "@thi.ng/geom-api";
import {
	KERNEL_BOX as $BOX,
	KERNEL_TRIANGLE as $GAUSSIAN,
	KERNEL_GAUSSIAN as $TRIANGLE,
	convolveClosed,
	convolveOpen,
} from "@thi.ng/geom-poly-utils/convolve";
import { Polygon } from "./api/polygon.js";
import { Polygon3 } from "./api/polygon3.js";
import { Polyline } from "./api/polyline.js";
import { Polyline3 } from "./api/polyline3.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Function overrides for {@link convolve}.
 */
export type ConvoleFn = {
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
 * - [`convolveClosed()`](https://docs.thi.ng/umbrella/geom-poly-utils/functions/convolveClosed.html))
 * - [`convolveOpen()`](https://docs.thi.ng/umbrella/geom-poly-utils/functions/convolveOpen.html))
 *
 * Currently only implemented for:
 *
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
		{},
		{
			poly: ($: Polygon, k, t, iter) =>
				__convolve(Polygon, convolveClosed, $, k, t, iter),

			poly3: ($: Polygon3, k, t, iter) =>
				__convolve(Polygon3, convolveClosed, $, k, t, iter),

			polyline: ($: Polyline, k, t, iter) =>
				__convolve(Polyline, convolveOpen, $, k, t, iter),

			polyline3: ($: Polyline3, k, t, iter) =>
				__convolve(Polyline3, convolveOpen, $, k, t, iter),
		}
	)
);

/** @internal */
const __convolve = <T extends PCLike>(
	ctor: PCLikeConstructor<T>,
	fn: typeof convolveClosed,
	$: T,
	kernel: number[],
	t?: number,
	iter?: number
) => new ctor(fn($.points, kernel, t, iter), __copyAttribs($));

export const KERNEL_BOX = $BOX;

export const KERNEL_TRI = $TRIANGLE;

export const KERNEL_GAUSSIAN = $GAUSSIAN;
