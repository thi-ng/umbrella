// SPDX-License-Identifier: Apache-2.0
import type { Attribs, IShape } from "./api.js";

/**
 * Returns a shallow copy of given shape with new `attribs` assigned (using
 * {@link IAttributed.withAttribs}). If `replace` is false, the new attribs will
 * be merged with the existing ones (if any).
 *
 * @param shape
 * @param attribs
 * @param replace
 */
export const withAttribs = <T extends IShape>(
	shape: T,
	attribs: Attribs = {},
	replace = true
) => <T>shape.withAttribs(replace ? attribs : { ...shape.attribs, ...attribs });
