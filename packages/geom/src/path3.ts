import type { Maybe } from "@thi.ng/api";
import type { Attribs, PathSegment3, SegmentType3 } from "./api.js";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { equals3 } from "@thi.ng/vectors/equals";
import type { Cubic3 } from "./api/cubic3.js";
import { Path3 } from "./api/path3.js";
import { asCubic } from "./as-cubic.js";
import { __copySegment } from "./internal/copy.js";

/**
 * Creates a new {@link Path3} instance, optional with given `segments`,
 * `subPaths` and `attribs`.
 *
 * @remarks
 * Segments and sub-paths can also be later added via {@link Path3.addSegments}
 * or {@link Path3.addSubPaths}.
 *
 * @param segments
 * @param subPaths
 * @param attribs
 */
export const path3 = (
	segments?: Iterable<PathSegment3>,
	subPaths?: Iterable<PathSegment3[]>,
	attribs?: Attribs
) => new Path3(segments, subPaths, attribs);

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
 * Also see {@link normalizedPath}.
 *
 * @param cubics
 * @param attribs
 */
export const pathFromCubics3 = (cubics: Cubic3[], attribs?: Attribs) => {
	let subPaths: PathSegment3[][] = [];
	let curr: PathSegment3[];
	let lastP: Maybe<ReadonlyVec>;
	const $beginPath = (c: Cubic3) => {
		curr = [{ type: "m", point: c.points[0] }];
		subPaths.push(curr);
	};
	for (let c of cubics) {
		if (!(lastP && equals3(lastP, c.points[0]))) $beginPath(c);
		curr!.push({ type: "c", geo: c });
		lastP = c.points[3];
	}
	const path = new Path3(
		subPaths[0],
		subPaths.slice(1),
		attribs || cubics[0].attribs
	);
	return path;
};

/**
 * Converts given path into a new one with segments converted to {@link Cubic3}
 * bezier segments. Unless specific segment types are specified via `only`, by
 * default all segments will be converted.
 *
 * @remarks
 * Also see {@link pathFromCubics}.
 *
 * @param path
 * @param only
 */
export const normalizedPath3 = (
	path: Path3,
	only?: Extract<SegmentType3, "l" | "p" | "q">[]
) => {
	const $normalize = (segments: PathSegment3[]) => [
		...mapcat((s) => {
			if (s.geo && (!only || only.includes(<any>s.type))) {
				return map<Cubic3, PathSegment3>(
					(c) => ({ type: "c", geo: c }),
					asCubic(s.geo)
				);
			}
			return [__copySegment(s)];
		}, segments),
	];
	return new Path3(
		$normalize(path.segments),
		path.subPaths.map($normalize),
		path.attribs
	);
};
