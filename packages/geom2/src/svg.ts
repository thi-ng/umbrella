import { serialize } from "@thi.ng/hiccup";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { ff } from "@thi.ng/hiccup-svg/format";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { Attribs, IShape, Rect2 } from "./api";
import { collBounds } from "./internal/bounds";

export const asSvg = (...args: any[]) =>
    args
        .map((x) => serialize(convertTree(x)))
        .join("");

export const svgDoc = (attribs: Attribs, ...args: IShape[]) => {
    if (args.length > 0) {
        if (!attribs || !attribs.viewBox) {
            const b = <Rect2>collBounds(args);
            attribs = {
                width: ff(b.size[0]),
                height: ff(b.size[1]),
                viewBox: `${ff(b.pos[0])} ${ff(b.pos[1])} ${ff(b.size[0])} ${ff(b.size[1])}`,
                ...attribs
            };
        }
    }
    return svg(attribs, ...args);
};
