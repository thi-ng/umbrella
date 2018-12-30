import { ReadonlyVec } from "@thi.ng/vectors3/api";
import { normalize as _normalize } from "@thi.ng/vectors3/normalize";
import { cross3 } from "@thi.ng/vectors3/cross";
import { quatFromAxisAngle } from "./quat-axis-angle";
import { dot3 } from "@thi.ng/vectors3/dot";
import { mag } from "@thi.ng/vectors3/mag";

export const alignmentQuat =
    (from: ReadonlyVec, to: ReadonlyVec, normalize = true) => {
        if (normalize) {
            from = _normalize([], from);
            to = _normalize([], to);
        }
        const axis = cross3([], from, to);
        return quatFromAxisAngle(
            axis,
            Math.atan2(mag(axis), dot3(from, to))
        )
    };
