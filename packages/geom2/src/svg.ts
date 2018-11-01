import { serialize } from "@thi.ng/hiccup";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { collBounds } from "./internal/bounds";
import { IShape, Rect2 } from "./api";

export const asSVG = (...args: any[]) =>
    args
        .map((x) => serialize(convertTree(x)))
        .join("");

export const svgDoc = (attribs, ...args: IShape[]) => {
    const b = <Rect2>collBounds(args);
    attribs = {
        width: b.size[0],
        height: b.size[1],
        viewBox: `${b.pos[0]} ${b.pos[1]} ${b.size[0]} ${b.size[1]}`,
        ...attribs
    };
    return svg(attribs, ...args);
};
