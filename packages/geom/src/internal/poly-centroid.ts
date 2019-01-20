import { cross2, ReadonlyVec, Vec } from "@thi.ng/vectors3";

export const polyCentroid =
    (pts: ReadonlyVec[], c: Vec = []) => {
        let area = 0;
        let x = 0;
        let y = 0;
        for (let n = pts.length - 1, i = pts[n], j = pts[0], k = 0; k <= n; i = j, j = pts[++k]) {
            const z = cross2(i, j);
            area += z;
            x += (i[0] + j[0]) * z;
            y += (i[1] + j[1]) * z;
        }
        area = 1 / (area * 3);
        c[0] = x * area;
        c[1] = y * area;
        return c;
    };
