import type { Tessellator } from "@thi.ng/geom-api";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { partition } from "@thi.ng/transducers/partition";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import { zip } from "@thi.ng/transducers/zip";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";

export const rimTris: Tessellator = (points: ReadonlyVec[]) => {
	const edgeCentroids = transduce(
		comp(
			partition<Vec>(2, 1),
			map((e) => mixN([], e[0], e[1], 0.5))
		),
		push<Vec>(),
		wrapSides(points, 0, 1)
	);
	return transduce(
		comp(
			partition<Vec[]>(2, 1),
			map((t) => [t[0][0], t[1][1], t[1][0]])
		),
		push(),
		[edgeCentroids],
		wrapSides([...zip(edgeCentroids, points)], 1, 0)
	);
};
