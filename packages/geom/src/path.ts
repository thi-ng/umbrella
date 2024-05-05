import type { Maybe } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import type { Attribs, PathSegment } from "@thi.ng/geom-api";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { equals2 } from "@thi.ng/vectors/equals";
import { maddN2 } from "@thi.ng/vectors/maddn";
import type { Cubic } from "./api/cubic.js";
import { Path } from "./api/path.js";
import { asCubic } from "./as-cubic.js";
import { PathBuilder } from "./path-builder.js";

export const path = (
	segments: Iterable<PathSegment>,
	subPaths: Iterable<PathSegment[]> = [],
	attribs?: Attribs
) => new Path(segments, subPaths, attribs);

/**
 * Constructs a {@link Path} from given sequence of cubic curves, with optional
 * `attribs`.
 *
 * @remarks
 * If no `attribs` are given, those from the first curve will be used.
 *
 * For each successive curve segment, if the start point of the current curve is
 * not the same as the last point of the previous curve, a new sub path will be
 * started.
 *
 * @param cubics
 * @param attribs
 */
export const pathFromCubics = (cubics: Cubic[], attribs?: Attribs) => {
	let subPaths: PathSegment[][] = [];
	let curr: PathSegment[];
	let lastP: Maybe<ReadonlyVec>;
	const $beginPath = (c: Cubic) => {
		curr = [{ type: "m", point: c.points[0] }];
		subPaths.push(curr);
	};
	for (let c of cubics) {
		if (!(lastP && equals2(lastP, c.points[0]))) $beginPath(c);
		curr!.push({ type: "c", geo: c });
		lastP = c.points[3];
	}
	const path = new Path(
		subPaths[0],
		subPaths.slice(1),
		attribs || cubics[0].attribs
	);
	return path;
};

export const normalizedPath = (path: Path) => {
	const $normalize = (segments: PathSegment[]) => [
		...mapcat(
			(s) =>
				s.geo
					? map<Cubic, PathSegment>(
							(c) => ({ type: "c", geo: c }),
							asCubic(s.geo)
					  )
					: [{ ...s }],
			segments
		),
	];
	return new Path(
		$normalize(path.segments),
		path.subPaths.map($normalize),
		path.attribs
	);
};

export const roundedRect = (
	pos: Vec,
	size: Vec,
	r: number | Vec,
	attribs?: Attribs
) => {
	r = isNumber(r) ? [r, r] : r;
	const [w, h] = maddN2([], r, -2, size);
	return new PathBuilder(attribs)
		.moveTo([pos[0] + r[0], pos[1]])
		.hlineTo(w, true)
		.arcTo(r, r, 0, false, true, true)
		.vlineTo(h, true)
		.arcTo([-r[0], r[1]], r, 0, false, true, true)
		.hlineTo(-w, true)
		.arcTo([-r[0], -r[1]], r, 0, false, true, true)
		.vlineTo(-h, true)
		.arcTo([r[0], -r[1]], r, 0, false, true, true)
		.current();
};
