import { Vec2 } from "@thi.ng/vectors/vec2";
import { corner } from "./corner";

/**
 * Returns array of points defining the 2D Convex Hull of `pts` using
 * the Graham Scan method.
 *
 * https://en.wikipedia.org/wiki/Graham_scan
 *
 * @param pts
 */
export const convexHull = (pts: ReadonlyArray<Vec2>) => {
    const num = pts.length;
    const res: Vec2[] = [];
    let h = 0, i;
    pts = pts.slice().sort(Vec2.comparator(0, 1));

    const scan = (p: Vec2, thresh: number) => {
        while (h >= thresh && corner(res[h - 2], res[h - 1], p) >= 0) {
            res.pop();
            h--;
        }
        res[h++] = p;
    };

    for (i = 0; i < num; i++) {
        scan(pts[i], 2);
    }
    res.pop();
    h--;
    const h2 = h + 2;
    for (i = num - 1; i >= 0; i--) {
        scan(pts[i], h2);
    }
    res.pop();
    return res;
};
