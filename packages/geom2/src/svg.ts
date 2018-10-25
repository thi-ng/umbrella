import { serialize } from "@thi.ng/hiccup";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { collBounds } from "./internal/bounds";
import { Shape, Rect2 } from "./api";

export const asSVG = (...args: any[]) =>
    serialize(convertTree(args));

export const svgDoc = (attribs, ...args: Shape[]) => {
    const bounds = <Rect2>collBounds(args);
    attribs = {
        width: bounds.size.x,
        height: bounds.size.y,
        viewBox: `${bounds.pos.x} ${bounds.pos.y} ${bounds.size.x} ${bounds.size.y}`,
        ...attribs
    };
    return asSVG(svg(attribs, ...args));
};
