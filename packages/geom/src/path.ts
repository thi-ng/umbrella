import type { Attribs, PathSegment2, SegmentType2 } from "./api.js";
import type { Cubic } from "./api/cubic.js";
import { Path } from "./api/path.js";
import { __normalizedPath, __pathFromCubics } from "./internal/path.js";

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
