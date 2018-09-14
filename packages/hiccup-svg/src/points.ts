import { Vec2Like } from "./api";
import { ff } from "./format";

export const points = (pts: Iterable<Vec2Like>, attribs?: any): any[] => {
    attribs = { ...attribs };
    const size = ff(attribs.size || 1);
    delete attribs.size;
    const group = ["g", attribs];
    for (let p of pts) {
        group.push(["rect", { x: ff(p[0]), y: ff(p[1]), width: size, height: size }]);
    }
    return group;
};
