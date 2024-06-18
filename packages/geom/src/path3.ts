import type { Attribs, PathSegment3, SegmentType3 } from "./api.js";
import type { Cubic3 } from "./api/cubic3.js";
import { Path3 } from "./api/path3.js";
import { __normalizedPath, __pathFromCubics } from "./internal/path.js";

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
export const pathFromCubics3 = (cubics: Cubic3[], attribs?: Attribs) =>
	__pathFromCubics<3>(Path3, cubics, attribs);

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
) => __normalizedPath<3>(Path3, path, only);
