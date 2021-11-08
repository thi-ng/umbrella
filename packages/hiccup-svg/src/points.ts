import { fattribs, ff, withoutKeys } from "./format.js";
import type { Vec2Like } from "./api.js";

/**
 * Shape instancing group.
 *
 * @remarks
 * The `shape` arg can be an SVG shape `#id` defined elsewhere in the
 * document or set to `circle` or `rect` (default).
 *
 * The `size` arg is only used for the latter two shape types and
 * defines the radius or width respectively.
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
    attribs?: any,
    ...body: any[]
): any[] => {
    const group = [
        "g",
        fattribs(withoutKeys(attribs, new Set(["shape", "size"]))),
        ...body,
    ];
    const href = buildSymbol(group, shape, size);
    for (let p of pts) {
        // TODO replace w/ SVG2 `href` once Safari supports it
        group.push(["use", { "xlink:href": href, x: ff(p[0]), y: ff(p[1]) }]);
    }
    return group;
};

/**
 * Similar to {@link points}, but takes points from a single large flat
 * buffer of coordinates with arbitrary striding.
 *
 * @remarks
 * In addition to `shape` and `size`, the following attribs can be used
 * to define the index range and strides:
 *
 * - `start` - start index (default: 0)
 * - `num` - number of points (default: buffer length/2)
 * - `cstride` - component stride (default: 1)
 * - `estride` - element stride (default: 2)
 *
 * @param pts - flat point buffer
 * @param shape - shape type
 * @param size - point size/radius
 * @param attribs - other attributes
 */
export const packedPoints = (
    pts: ArrayLike<number>,
    shape: string,
    size = 1,
    attribs?: any,
    ...body: any[]
): any[] => {
    attribs = {
        start: 0,
        cstride: 1,
        estride: 2,
        ...attribs,
    };
    const { start, cstride, estride } = attribs;
    let num =
        attribs && attribs.num != null
            ? attribs.num
            : ((pts.length - start) / estride) | 0;
    const group = [
        "g",
        fattribs(
            withoutKeys(
                attribs,
                new Set(["start", "cstride", "estride", "shape", "size", "num"])
            )
        ),
        ...body,
    ];
    const href = buildSymbol(group, shape, size);
    for (let i = start; num-- > 0; i += estride) {
        // TODO replace w/ SVG2 `href` once Safari supports it
        group.push([
            "use",
            { "xlink:href": href, x: ff(pts[i]), y: ff(pts[i + cstride]) },
        ]);
    }
    return group;
};

const buildSymbol = (group: any[], shape: string, size: number) => {
    let href: string;
    if (!shape || shape[0] !== "#") {
        href = "_" + ((Math.random() * 1e6) | 0).toString(36);
        group.push(["g", { opacity: 0 }, buildShape(shape, href, size)]);
        href = "#" + href;
    } else {
        href = shape;
    }
    return href;
};

const buildShape = (shape: string, id: string, r: number) => {
    const rf = ff(r);
    if (shape === "circle") {
        return ["circle", { id, cx: 0, cy: 0, r: rf }];
    }
    const rf2 = ff(-r / 2);
    return ["rect", { id, x: rf2, y: rf2, width: rf, height: rf }];
};
