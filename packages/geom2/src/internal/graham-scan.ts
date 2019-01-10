import { comparator2, signedArea2, Vec } from "@thi.ng/vectors3";

/**
 * Returns array of points defining the 2D Convex Hull of `pts` using
 * the Graham Scan method.
 *
 * https://en.wikipedia.org/wiki/Graham_scan
 *
 * @param pts
 */
export const grahamScan2 =
    (pts: ReadonlyArray<Vec>) => {
        const num = pts.length;
        const res: Vec[] = [];
        let h = 0, i;
        pts = pts.slice().sort(comparator2(0, 1));

        const scan = (p: Vec, thresh: number) => {
            while (h >= thresh && signedArea2(res[h - 2], res[h - 1], p) >= 0) {
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
