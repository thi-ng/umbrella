import { add, max, min, ReadonlyVec, sub, VecPair } from "@thi.ng/vectors";

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
export const unionBounds = (
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
