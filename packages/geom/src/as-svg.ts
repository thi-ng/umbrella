import type { Attribs, IShape } from "@thi.ng/geom-api";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { ff } from "@thi.ng/hiccup-svg/format";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { serialize } from "@thi.ng/hiccup/serialize";
import { bounds } from "./bounds.js";
import { __collBounds } from "./internal/bounds.js";

export const asSvg = (...args: any[]) =>
    args.map((x) => serialize(convertTree(x))).join("");

export const svgDoc = (attribs: Attribs, ...xs: IShape[]) => {
    if (xs.length > 0) {
        if (!attribs || !attribs.viewBox) {
            const cbounds = __collBounds(xs, bounds);
            if (cbounds) {
                const [[x, y], [w, h]] = cbounds;
                attribs = {
                    width: ff(w),
                    height: ff(h),
                    viewBox: `${ff(x)} ${ff(y)} ${ff(w)} ${ff(h)}`,
                    ...attribs,
                };
            }
        }
    }
    return svg(attribs, ...xs);
};
