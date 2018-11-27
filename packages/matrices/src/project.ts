import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { divN3 } from "@thi.ng/vectors3/divn";
import { dotValues6 } from "@thi.ng/vectors3/dot-values";
import { fromHomogeneous4 } from "@thi.ng/vectors3/homogeneous";
import { ReadonlyMat } from "./api";
import { invert23, invert44 } from "./invert";
import { mulV23, mulV344, mulV44 } from "./mulv";

/**
 * Transforms given point `p` (4D, homogeneous) with M44 `mvp`, applies
 * perspective divide and then transforms XY components with M23 `view`
 * matrix. Returns 3D vector. The result Z component can be used for
 * depth sorting.
 *
 * @param out
 * @param mvp
 * @param view
 * @param p
 */
export const project =
    (out: Vec, mvp: ReadonlyMat, view: ReadonlyMat, p: ReadonlyVec) =>
        mulV23(out, view, fromHomogeneous4(out, mulV44([], mvp, p)));

/**
 * Reverse operation of project. If `invert` is true (default: false),
 * both `mvp` and `view` matrices will be inverted first
 * (non-destructively), else they're both assumed to be inverted
 * already.
 *
 * @param out
 * @param mvp
 * @param view
 * @param p
 * @param invert
 */
export const unproject =
    (out: Vec, mvp: ReadonlyMat, view: ReadonlyMat, p: ReadonlyVec, doInvert = false) => {
        if (doInvert) {
            mvp = invert44([], mvp);
            view = invert23([], view);
        }
        const q = [...mulV23([], view, p), p[2] * 2 - 1];
        return divN3(
            out,
            mulV344(out, mvp, q),
            dotValues6(q[0], mvp[3], q[1], mvp[7], q[2], mvp[11]) + mvp[15]
        );
    };
