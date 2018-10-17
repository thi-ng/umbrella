import { peek } from "@thi.ng/transducers/func/peek";
import { IVector } from "@thi.ng/vectors/api";
import { farthestPointSegment } from "./closest-point";

// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm

export const simplifyPolyline =
    <T extends IVector<T>>(pts: T[], eps = 0, closed = false) => {

        let num = pts.length;
        const visited: boolean[] = [];
        if (num <= 2) {
            return pts.slice();
        }
        if (closed && !pts[0].eqDelta(peek(pts))) {
            pts = pts.slice();
            pts.push(pts[0]);
            num++;
        }

        const $ = (from: number, to: number) => {
            visited[from] = visited[to] = true;
            if (to <= from + 1) {
                return;
            }
            const [maxIdx, maxD] = farthestPointSegment(pts[from], pts[to], pts, from + 1, to);
            if (maxD <= eps) {
                return;
            }
            $(from, maxIdx);
            $(maxIdx, to);
        };

        $(0, num - 1);

        const res: T[] = [];
        for (let i = 0, n = closed ? num - 1 : num; i < n; i++) {
            if (visited[i]) {
                res.push(pts[i]);
            }
        }
        return res;
    };
