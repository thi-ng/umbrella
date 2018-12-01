import { EPS } from "@thi.ng/math/api";
import { peek } from "@thi.ng/transducers/func/peek";
import { Vec } from "@thi.ng/vectors3/api";
import { eqDelta } from "@thi.ng/vectors3/eqdelta";
import { farthestPointSegment } from "./closest-point";

// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm

export const douglasPeucker2 =
    (pts: Vec[], eps = 0, closed = false) => {

        let num = pts.length;
        const visited: boolean[] = [];
        if (num <= 2) return pts.slice();
        if (closed && !eqDelta(pts[0], peek(pts), EPS)) {
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

        const res: Vec[] = [];
        for (let i = 0, n = closed ? num - 1 : num; i < n; i++) {
            if (visited[i]) {
                res.push(pts[i]);
            }
        }
        return res;
    };
