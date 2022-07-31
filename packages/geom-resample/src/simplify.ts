import { farthestPointSegment } from "@thi.ng/geom-closest-point/line";
import { EPS } from "@thi.ng/math/api";
import type { Vec } from "@thi.ng/vectors";
import { eqDelta } from "@thi.ng/vectors/eqdelta";

/**
 * {@link https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm}
 *
 * @param pts - points
 * @param eps - simplify threshold
 * @param closed - true, if closed shape (polygon)
 */
export const simplify = (pts: Vec[], eps = 0, closed = false) => {
	let num = pts.length;
	const visited: boolean[] = [];
	if (num <= 2) return pts.slice();
	if (closed && !eqDelta(pts[0], pts[num - 1], EPS)) {
		pts = pts.slice();
		pts.push(pts[0]);
		num++;
	}

	const $ = (from: number, to: number) => {
		visited[from] = visited[to] = true;
		if (to <= from + 1) {
			return;
		}
		const [maxIdx, maxD] = farthestPointSegment(
			pts[from],
			pts[to],
			pts,
			from + 1,
			to
		);
		if (maxIdx < 0 || maxD <= eps) {
			return;
		}
		$(from, maxIdx);
		$(maxIdx, to);
	};

	$(0, num - 1);

	const res: Vec[] = [];
	for (let i = 0, n = closed ? num - 1 : num; i < n; i++) {
		visited[i] && res.push(pts[i]);
	}
	return res;
};
