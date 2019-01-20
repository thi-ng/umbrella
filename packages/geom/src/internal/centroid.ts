import { illegalArgs } from "@thi.ng/errors";
import {
    add,
    divN,
    empty,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors";

export const centroidRaw =
    (pts: ReadonlyVec[], out?: Vec) => {
        const num = pts.length;
        !num && illegalArgs("no points available");
        !out && (out = empty(pts[0]));
        for (let i = num; --i >= 0;) {
            add(out, out, pts[i]);
        }
        return divN(null, out, num);
    };
