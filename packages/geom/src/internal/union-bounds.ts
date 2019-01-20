import {
    add,
    max,
    min,
    ReadonlyVec,
    sub
} from "@thi.ng/vectors";
import { VecPair } from "../api";

/**
 * Takes the position and size vectors of 2 `AABBLike`s and returns
 * 2-tuple of `[pos,size]` of their union bounds.
 *
 * @param apos
 * @param asize
 * @param bpos
 * @param bsize
 */
export const unionBounds =
    (apos: ReadonlyVec, asize: ReadonlyVec, bpos: ReadonlyVec, bsize: ReadonlyVec): VecPair => {
        const p = add([], apos, asize);
        const q = add([], bpos, bsize);
        const pos = min([], apos, bpos);
        return [pos, sub(null, max(null, p, q), pos)];
    };
