import type { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { partition } from "@thi.ng/transducers/partition";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";

export const quadFan: Tessellator = (points: ReadonlyVec[]) => {
	const p = centroid(points);
	return transduce(
		comp(
			partition<Vec>(3, 1),
			map(([a, b, c]) => [mixN([], a, b, 0.5), b, mixN([], b, c, 0.5), p])
		),
		push(),
		wrapSides(points)
	);
};
