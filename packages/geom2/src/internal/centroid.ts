import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
    add,
    divN,
    empty,
    ReadonlyVec,
    setS,
    Vec
} from "@thi.ng/vectors2/api";
import { cross2 } from "@thi.ng/vectors2/vec2";

export const centroid =
    (pts: ReadonlyVec[], c?: Vec) => {
        const num = pts.length;
        !num && illegalArgs("no points available");
        !c && (c = empty(pts[0]));
        for (let i = num; --i >= 0;) {
            add(c, pts[i]);
        }
        return divN(c, num);
    };

export const centerOfWeight2 =
    (pts: ReadonlyVec[], c?: Vec) => {
        let area = 0;
        let x = 0;
        let y = 0;
        for (let n = pts.length - 1, i = pts[n], j = pts[0], k = 0; k <= n; k++ , i = j, j = pts[k]) {
            const z = cross2(i, j);
            area += z;
            x += (i[0] + j[0]) * z;
            y += (i[1] + j[1]) * z;
        }
        area = 1 / (area * 3);
        x *= area;
        y *= area;
        return c ? setS(c, x, y) : [x, y];
    };
