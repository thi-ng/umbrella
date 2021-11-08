import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { divN } from "@thi.ng/vectors/divn";
import { empty } from "@thi.ng/vectors/empty";

export const centroid = (pts: ReadonlyVec[], out?: Vec) => {
    const num = pts.length;
    !num && illegalArgs("no points");
    !out && (out = empty(pts[0]));
    for (let i = num; i-- > 0; ) {
        add(out, out, pts[i]);
    }
    return divN(out, out, num);
};
