// SPDX-License-Identifier: Apache-2.0
/**
 * Helper function to immutably merge attribs from two sources and
 * concatenate their `class` values and merge their `style` maps (if
 * present). Returns merged result object.
 *
 * @param base - base attribs
 * @param attribs - overrides
 *
 * @internal
 */
export const mergeAttribs = (base: any, attribs: any) => {
	if (!attribs) return base;
	const res = { ...base, ...attribs };
	base.class &&
		attribs.class &&
		(res.class = base.class + " " + attribs.class);
	base.style &&
		attribs.style &&
		(res.style = { ...base.style, ...attribs.style });
	return res;
};
