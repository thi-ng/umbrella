import type { Maybe } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import type { Attribs, PathSegment2, SegmentType2 } from "@thi.ng/geom-api";
import { map } from "@thi.ng/transducers/map";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { equals2 } from "@thi.ng/vectors/equals";
import type { Cubic } from "./api/cubic.js";
import { Path } from "./api/path.js";
import { asCubic } from "./as-cubic.js";
import { __copySegment } from "./internal/copy.js";
import { PathBuilder } from "./path-builder.js";

/**
 * Creates a new {@link Path} instance, optional with given `segments`,
 * `subPaths` and `attribs`.
 *
 * @remarks
 * Segments and sub-paths can also be later added via {@link Path.addSegments}
 * or {@link Path.addSubPaths}.
 *
 * @param segments
 * @param subPaths
 * @param attribs
 */
export const path = (
	segments?: Iterable<PathSegment2>,
	subPaths?: Iterable<PathSegment2[]>,
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
 * Also see {@link normalizedPath}.
 *
 * @param cubics
 * @param attribs
 */
export const pathFromCubics = (cubics: Cubic[], attribs?: Attribs) => {
	let subPaths: PathSegment2[][] = [];
	let curr: PathSegment2[];
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

/**
 * Converts given path into a new one with segments converted to {@link Cubic}
 * bezier segments. Unless specific segment types are specified via `only`, by
 * default all segments will be converted.
 *
 * @remarks
 * Also see {@link pathFromCubics}.
 *
 * @param path
 * @param onlyArcs
 */
export const normalizedPath = (
	path: Path,
	only?: Extract<SegmentType2, "a" | "l" | "p" | "q">[]
) => {
	const $normalize = (segments: PathSegment2[]) => [
		...mapcat((s) => {
			s.type;
			if (s.geo && (!only || only.includes(<any>s.type))) {
				return map<Cubic, PathSegment2>(
					(c) => ({ type: "c", geo: c }),
					asCubic(s.geo)
				);
			}
			return [__copySegment(s)];
		}, segments),
	];
	return new Path(
		$normalize(path.segments),
		path.subPaths.map($normalize),
		path.attribs
	);
};

/**
 * Creates a new rounded rect {@link Path}, using the given corner radius or
 * radii.
 *
 * @remarks
 * If multiple `radii` are given, the interpretation logic is the same as:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
 *
 * - number: all corners
 * - `[top-left-and-bottom-right, top-right-and-bottom-left]`
 * - `[top-left, top-right-and-bottom-left, bottom-right]`
 * - `[top-left, top-right, bottom-right, bottom-left]`
 *
 * No arc segments will be generated for those corners where the radius <= 0
 *
 * @param pos
 * @param size
 * @param radii
 * @param attribs
 */
export const roundedRect = (
	pos: Vec,
	[w, h]: Vec,
	radii:
		| number
		| [number, number]
		| [number, number, number]
		| [number, number, number, number],
	attribs?: Attribs
) => {
	const [tl, tr, br, bl] = isNumber(radii)
		? [radii, radii, radii, radii]
		: radii.length === 2
		? [radii[0], radii[1], radii[0], radii[1]]
		: radii.length === 3
		? [radii[0], radii[1], radii[2], radii[1]]
		: radii;
	const b = new PathBuilder(attribs)
		.moveTo([pos[0] + tl, pos[1]])
		.hlineTo(w - tl - tr, true);
	if (tr > 0) b.arcTo([tr, tr], [tr, tr], 0, false, true, true);
	b.vlineTo(h - tr - br, true);
	if (br > 0) b.arcTo([-br, br], [br, br], 0, false, true, true);
	b.hlineTo(-(w - br - bl), true);
	if (bl > 0) b.arcTo([-bl, -bl], [bl, bl], 0, false, true, true);
	b.vlineTo(-(h - bl - tl), true);
	if (tl > 0) b.arcTo([tl, -tl], [tl, tl], 0, false, true, true);
	return b.current().close();
};
