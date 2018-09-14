import { Vec2Like } from "./api";
import { ff } from "./format";

export const points = (pts: Iterable<Vec2Like>, shape: string, attribs?: any): any[] => {
    attribs = { ...attribs };
    const size = ff(attribs.size || 1);
    delete attribs.size;
    const group = ["g", attribs];
    let href: string;
    if (shape[0] !== "#") {
        href = "_" + ((Math.random() * 1e6) | 0).toString(36);
        group.push(["g", { opacity: 0 },
            shape === "circle" ?
                ["circle", { id: href, cx: 0, cy: 0, r: size }] :
                ["rect", { id: href, x: 0, y: 0, width: size, height: size }]
        ]);
        href = "#" + href;
    } else {
        href = shape;
    }
    for (let p of pts) {
        group.push(["use", { "xlink:href": href, x: ff(p[0]), y: ff(p[1]) }]);
    }
    return group;
};
