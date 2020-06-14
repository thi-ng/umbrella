import { serialize } from "@thi.ng/hiccup";
import { convertTree, ff, svg } from "@thi.ng/hiccup-svg";
import { collBounds } from "../internal/coll-bounds";
import { bounds } from "./bounds";
import type { Attribs, IShape } from "@thi.ng/geom-api";

export const asSvg = (...args: any[]) =>
    args.map((x) => serialize(convertTree(x))).join("");

export const svgDoc = (attribs: Attribs, ...xs: IShape[]) => {
    if (xs.length > 0) {
        if (!attribs || !attribs.viewBox) {
            const [pos, size] = collBounds(xs, bounds)!;
            attribs = {
                width: ff(size[0]),
                height: ff(size[1]),
                viewBox: `${ff(pos[0])} ${ff(pos[1])} ${ff(size[0])} ${ff(
                    size[1]
                )}`,
                ...attribs,
            };
        }
    }
    return svg(attribs, ...xs);
};
