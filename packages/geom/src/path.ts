import { isNumber } from "@thi.ng/checks/is-number";
import type { Vec } from "@thi.ng/vectors";
import type { Attribs, PathSegment2, SegmentType2 } from "./api.js";
import type { Cubic } from "./api/cubic.js";
import { Path } from "./api/path.js";
import { __normalizedPath, __pathFromCubics } from "./internal/path.js";
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
 * If no `attribs` are given, those from the first curve will be used (if any).
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
export const pathFromCubics = (cubics: Cubic[], attribs?: Attribs) =>
	__pathFromCubics<2>(Path, cubics, attribs);

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
) => __normalizedPath<2>(Path, path, only);

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
