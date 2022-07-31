/**
 * Helper function to immutably merge attribs from two sources and
 * concatenate their `class` values and merge their `style` maps (if
 * present). Returns merged result object.
 *
 * @param base - base attribs
 * @param xs - overrides
 *
 * @internal
 */
export const mergeAttribs = (base: any, xs: any) => {
	if (!xs) return base;
	const res = { ...base, ...xs };
	base.class && xs.class && (res.class = base.class + " " + xs.class);
	base.style && xs.style && (res.style = { ...base.style, ...xs.style });
	return res;
};
