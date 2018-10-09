import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { IVector } from "@thi.ng/vectors/api";
import { Vec2 } from "@thi.ng/vectors/vec2";

export const centroid = <T extends IVector<T>>(pts: ReadonlyArray<T>, c?: T) => {
    const num = pts.length;
    !num && illegalArgs("no points available");
    !c && (c = pts[0].empty());
    for (let i = num; --i >= 0;) {
        c.add(pts[i]);
    }
    return c.divN(num);
};

export const centerOfWeight = (pts: Vec2[], c?: Vec2) => {
    let area = 0;
    let x = 0;
    let y = 0;
    for (let n = pts.length - 1, i = pts[n], j = pts[0], k = 0; k <= n; k++ , i = j, j = pts[k]) {
        const z = i.cross(j);
        area += z;
        x += (i.x + j.x) * z;
        y += (i.y + j.y) * z;
    }
    area = 1 / (area * 3);
    x *= area;
    y *= area;
    return c ? c.setS(x, y) : new Vec2([x, y]);
};
