import {
    divN3,
    dotC6,
    fromHomogeneous4,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors";
import { ReadonlyMat } from "./api";
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
 * Reverse operation of {@link project}. If `invert` is true (default:
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
    const q = [...mulV23([], view, p), p[2] * 2 - 1];
    return divN3(
        out,
        mulV344(out, mvp, q),
        dotC6(q[0], mvp[3], q[1], mvp[7], q[2], mvp[11]) + mvp[15]
    );
};
