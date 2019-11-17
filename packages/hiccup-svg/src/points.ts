import { Vec2Like } from "./api";
import { fattribs, ff } from "./format";

/**
 * Shape instancing group. The `shape` can be an SVG shape `#id` defined
 * elsewhere in the document or set to `circle` or `rect` (default). The
 * `size` arg is only used for the latter two shape types and defines
 * the radius or width respectively.
 *
 * @param pts - points
 * @param shape - shape type
 * @param size - point size/radius
 * @param attribs - attributes
 */
export const points = (
    pts: Iterable<Vec2Like>,
    shape: string,
    size = 1,
    attribs?: any
): any[] => {
    const group = ["g", fattribs({ ...attribs })];
    let href: string;
    if (!shape || shape[0] !== "#") {
        href = "_" + ((Math.random() * 1e6) | 0).toString(36);
        group.push(["g", { opacity: 0 }, buildShape(shape, href, size)]);
        href = "#" + href;
    } else {
        href = shape;
    }
    for (let p of pts) {
        // TODO replace w/ SVG2 `href` once Safari supports it
        group.push(["use", { "xlink:href": href, x: ff(p[0]), y: ff(p[1]) }]);
    }
    return group;
};

const buildShape = (shape: string, id: string, r: number) => {
    const rf = ff(r);
    if (shape === "circle") {
        return ["circle", { id, cx: 0, cy: 0, r: rf }];
    }
    const rf2 = ff(-r / 2);
    return ["rect", { id, x: rf2, y: rf2, width: rf, height: rf }];
};
