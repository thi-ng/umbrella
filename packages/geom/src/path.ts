import type { Attribs, PathSegment2 } from "./api.js";
import { Path } from "./api/path.js";

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
