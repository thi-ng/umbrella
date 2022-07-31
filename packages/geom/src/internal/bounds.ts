import type { Fn } from "@thi.ng/api";
import type { AABBLike, IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec, VecPair } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { max } from "@thi.ng/vectors/max";
import { min } from "@thi.ng/vectors/min";
import { sub } from "@thi.ng/vectors/sub";

/**
 * Computes the total bounds for the given shape collection, which should either
 * contain only 2D or 3D types. No mixed dimensions are allowed! Currently the
 * {@link bounds} function MUST be passed in as arg to avoid circular module
 * dependencies. Returns 2-tuple of `[pos, size]`.
 *
 * @param shapes - input shapes
 * @param bounds - bbox function
 */
export const __collBounds = (
	shapes: IShape[],
	bounds: Fn<IShape, AABBLike | undefined>
) => {
	let n = shapes.length - 1;
	if (n < 0) return;
	let b = bounds(shapes[n]);
	if (!b) return;
	let { pos, size } = b;
	for (; n-- > 0; ) {
		b = bounds(shapes[n]);
		if (!b) continue;
		[pos, size] = __unionBounds(pos, size, b.pos, b.size);
	}
	return [pos, size];
};

/**
 * Takes the position and size vectors of 2
 * {@link @thi.ng/geom-api#AABBLike}s and returns 2-tuple of
 * `[pos,size]` of their union bounds.
 *
 * @param apos - bbox 1 min pos
 * @param asize - bbox1 size
 * @param bpos - bbox 2 min pos
 * @param bsize - bbox 2 size
 */
export const __unionBounds = (
	apos: ReadonlyVec,
	asize: ReadonlyVec,
	bpos: ReadonlyVec,
	bsize: ReadonlyVec
): VecPair => {
	const p = add([], apos, asize);
	const q = add([], bpos, bsize);
	const pos = min([], apos, bpos);
	return [pos, sub(null, max(null, p, q), pos)];
};
