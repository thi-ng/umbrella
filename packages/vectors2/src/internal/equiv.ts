import { EPS } from "@thi.ng/math/api";
import { eqDelta as _eqDelta } from "@thi.ng/math/eqdelta";
import { ReadonlyVec } from "../api";

/**
 * Similar to `equiv()`, but takes tolerance `eps` into account for
 * equality checks.
 *
 * @param a first vector
 * @param b second vector
 * @param n number of elements
 * @param eps tolerance
 * @param ia start index a
 * @param ib start index b
 * @param sa stride a
 * @param sb stride b
 */
export const eqDelta = (a: ReadonlyVec, b: ReadonlyVec, n: number, eps = EPS, ia = 0, ib = 0, sa = 1, sb = 1) => {
    for (; n > 0; n-- , ia += sa, ib += sb) {
        if (!_eqDelta(a[ia], b[ib], eps)) {
            return false;
        }
    }
    return true;
};

export const eqDeltaArray = (a: ReadonlyVec[], b: ReadonlyVec[], eps = EPS) => {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = a.length; --i >= 0;) {
        if (!eqDelta(a[i], b[i], a[i].length, eps)) {
            return false;
        }
    }
    return true;
};
