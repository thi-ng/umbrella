// SPDX-License-Identifier: Apache-2.0
import type { Attribs, PathSegment3 } from "./api.js";
import { Path3 } from "./api/path3.js";

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
