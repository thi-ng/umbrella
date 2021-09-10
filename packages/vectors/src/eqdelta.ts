import { implementsFunction } from "@thi.ng/checks/implements-function";
import { EPS } from "@thi.ng/math/api";
import { eqDelta as _eq } from "@thi.ng/math/eqdelta";
import type { MultiVecOpRoVVO, ReadonlyVec } from "./api";
import { compileHOF } from "./compile/emit";
import { vop } from "./vop";

const $ = (dim: number) =>
    eqDelta.add(
        dim,
        compileHOF(
            dim,
            [_eq, EPS],
            ([a, b]) => `eq(${a},${b},eps)`,
            "eq,_eps",
            "a,b,eps=_eps",
            "a,b",
            "",
            "&&",
            "return a.length === b.length && ",
            ";"
        )
    );

/**
 * Checks given vectors for componentwise equality, taking tolerance
 * `eps` (default: {@link @thi.ng/math#EPS}) into account.
 *
 * @param a
 * @param b
 * @param eps
 */
export const eqDelta: MultiVecOpRoVVO<boolean, number> = vop();

eqDelta.default((v1, v2, eps = EPS) => {
    if (implementsFunction(v1, "eqDelta")) {
        return v1.eqDelta(v2, eps);
    }
    if (implementsFunction(v2, "eqDelta")) {
        return v2.eqDelta(v1, eps);
    }
    return eqDeltaS(v1, v2, v1.length, eps);
});

export const eqDelta2 = $(2);
export const eqDelta3 = $(3);
export const eqDelta4 = $(4);

/**
 * Checks given strided vectors for componentwise equality, taking
 * tolerance `eps` (default: {@link @thi.ng/math#EPS}) into account.
 *
 * @param a - first vector
 * @param b - second vector
 * @param n - number of elements
 * @param eps - tolerance
 * @param ia - start index a
 * @param ib - start index b
 * @param sa - stride a
 * @param sb - stride b
 */
export const eqDeltaS = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    n: number,
    eps = EPS,
    ia = 0,
    ib = 0,
    sa = 1,
    sb = 1
) => {
    for (; n > 0; n--, ia += sa, ib += sb) {
        if (!_eq(a[ia], b[ib], eps)) {
            return false;
        }
    }
    return true;
};

export const eqDeltaArray = (a: ReadonlyVec[], b: ReadonlyVec[], eps = EPS) => {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    for (let i = a.length; --i >= 0; ) {
        if (!eqDelta(a[i], b[i], eps)) {
            return false;
        }
    }
    return true;
};

export const isInArray = (p: ReadonlyVec, pts: ReadonlyVec[], eps = EPS) => {
    for (let i = pts.length; --i >= 0; ) {
        if (eqDelta(p, pts[i], eps)) {
            return true;
        }
    }
    return false;
};
