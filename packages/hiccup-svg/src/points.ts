import { Vec2Like } from "./api";
import { ff } from "./format";

/**
 * Shape instancing group. The `shape` can be an SVG shape `#id` defined
 * elsewhere in the document or set to `circle` or `rect` (default). The
 * `size` arg is only used for the latter two shape types and defines
 * the radius or width respectively.
 *
 * @param pts
 * @param shape
 * @param size
 * @param attribs
 */
export const points = (pts: Iterable<Vec2Like>, shape: string, size = 1, attribs?: any): any[] => {
    const group = ["g", attribs];
    let href: string;
    if (!shape || shape[0] !== "#") {
        const r = ff(size);
        href = "_" + ((Math.random() * 1e6) | 0).toString(36);
        group.push(["g", { opacity: 0 },
            shape === "circle" ?
                ["circle", { id: href, cx: 0, cy: 0, r: r }] :
                ["rect", { id: href, x: 0, y: 0, width: r, height: r }]
        ]);
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
