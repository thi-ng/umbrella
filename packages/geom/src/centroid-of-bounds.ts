// SPDX-License-Identifier: Apache-2.0
import type { Vec } from "@thi.ng/vectors";
import type { IShape } from "./api.js";
import { bounds } from "./bounds.js";
import { centroid } from "./centroid.js";

/**
 * Attempts to compute the bounding box of given `shape` and if available,
 * returns its centroid (or writes it to `out`, if given). Otherwise returns
 * `undefined`.
 *
 * @param shape
 * @param out
 */
export const centroidOfBounds = (shape: IShape, out?: Vec) => {
	const b = bounds(shape);
	return b ? centroid(b, out) : undefined;
};
