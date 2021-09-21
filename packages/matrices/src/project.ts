import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { fromHomogeneous4 } from "@thi.ng/vectors/homogeneous";
import type { ReadonlyMat } from "./api";
import { invert23, invert44 } from "./invert";
import { mulV23, mulV344, mulV44 } from "./mulv";

/**
 * Transforms given point `p` (4D, homogeneous coordinates) with 4x4
 * matrix `mvp`, applies perspective divide and then transforms XY
 * components with 2x3 matrix `view` matrix. Returns 3D vector. The
 * result Z component can be used for depth sorting.
 *
 * @param out -
 * @param mvp - 4x4 matrix
 * @param view - 2x3 matrix
 * @param p -
 */
export const project = (
    out: Vec | null,
    mvp: ReadonlyMat,
    view: ReadonlyMat,
    p: ReadonlyVec
) => (
    !out && (out = []),
    mulV23(out, view, fromHomogeneous4(out, mulV44([], mvp, p)))
);

/**
 * Same as {@link project}, but slightly faster and more convenient for
 * the most common use case of projecting a 3D input point (assumes
 * `w=1` for its homogeneous coordinate, i.e. `[x,y,z,1]`). Returns
 * `undefined` if the computed perspective divisor is zero (and would
 * cause in `NaN` results).
 *
 * @param out -
 * @param mvp - 4x4 matrix
 * @param view - 2x3 matrix
 * @param p -
 */
export const project3 = (
    out: Vec | null,
    mvp: ReadonlyMat,
    view: ReadonlyMat,
    p: ReadonlyVec
) => {
    !out && (out = []);
    const q = mulV344(out, mvp, p);
    return q ? mulV23(q, view, q) : undefined;
};

/**
 * Reverse operation of {@link project3}. If `invert` is true (default:
 * false), both `mvp` and `view` matrices will be inverted first
 * (non-destructively), else they're both assumed to be inverted
 * already.
 *
 * @param out -
 * @param mvp - 4x4 matrix
 * @param view - 2x3 matrix
 * @param p -
 * @param invert -
 */
export const unproject = (
    out: Vec,
    mvp: ReadonlyMat,
    view: ReadonlyMat,
    p: ReadonlyVec,
    doInvert = false
) => {
    if (doInvert) {
        const _mvp = invert44([], mvp);
        const _view = invert23([], view);
        if (!_mvp || !_view) return;
        mvp = _mvp;
        view = _view;
    }
    return mulV344(out, mvp, mulV23([0, 0, p[2] * 2 - 1], view, p));
};
