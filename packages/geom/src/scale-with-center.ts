import type { IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mulN } from "@thi.ng/vectors/muln";
import { scale } from "./scale.js";
import { translate } from "./translate.js";

/**
 * Applies a sequence of translate and scale operations to return an uniformly
 * scaled version of the given shape using `center` as the point of reference.
 *
 * @remarks
 * This op is likely slower than using {@link transform} with a equivalent
 * transformation matrix (e.g. using [`scaleWithCenter()` from
 * thi.ng/matrices](https://docs.thi.ng/umbrella/matrices/functions/scaleWithCenter23.html)),
 * but will not change the shape type (as might be the case with `transform()`).
 *
 * Also see: {@link scaleImpl}, {@link translateImpl}, {@link applyTransforms}.
 *
 * @param shape
 * @param center
 * @param factor
 */
export const scaleWithCenter = <T extends IShape>(
	shape: T,
	center: ReadonlyVec,
	factor: number
) =>
	<T>translate(scale(translate(shape, mulN([], center, -1)), factor), center);
