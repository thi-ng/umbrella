import { vop } from "./vop";
import { MultiVecOpRoVVO, ReadonlyVec } from "./api";
import { EPS } from "@thi.ng/math/api";
import { eqDelta as _eq } from "@thi.ng/math/eqdelta";
import { implementsFunction } from "@thi.ng/checks/implements-function";

export const eqDelta: MultiVecOpRoVVO<boolean, number> = vop();

eqDelta.default(
    (v1, v2, eps = EPS) => {
        if (implementsFunction(v1, "eqDelta")) {
            return (<any>v1).eqDelta(v2, eps);
        }
        if (implementsFunction(v2, "eqDelta")) {
            return (<any>v2).eqDelta(v1, eps);
        }
        return eqDeltaStrided(v1, v2, v1.length, eps);
    }
);

eqDelta.add(2, (a, b, eps = EPS) =>
    a.length === b.length &&
    _eq(a[0], b[0], eps) &&
    _eq(a[1], b[1], eps)
);

eqDelta.add(3, (a, b, eps = EPS) =>
    a.length === b.length &&
    _eq(a[0], b[0], eps) &&
    _eq(a[1], b[1], eps) &&
    _eq(a[2], b[2], eps)
);

eqDelta.add(4, (a, b, eps = EPS) =>
    a.length === b.length &&
    _eq(a[0], b[0], eps) &&
    _eq(a[1], b[1], eps) &&
    _eq(a[2], b[2], eps) &&
    _eq(a[3], b[3], eps)
);

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
export const eqDeltaStrided = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    n: number,
    eps = EPS,
    ia = 0,
    ib = 0,
    sa = 1,
    sb = 1) => {

    for (; n > 0; n-- , ia += sa, ib += sb) {
        if (!_eq(a[ia], b[ib], eps)) {
            return false;
        }
    }
    return true;
};
