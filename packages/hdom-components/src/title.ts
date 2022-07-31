export interface TitleOpts {
	/**
	 * Element name for main title. Default: `h1`
	 */
	element: string;
	/**
	 * Attribs for main title: Default: none
	 */
	attribs: any;
	/**
	 * Element name for subtitle: Default: `small`
	 */
	subElement: string;
	/**
	 * Attribs for subtitle: Default: none
	 */
	subAttribs: any;
}

/**
 * Configurable Higher order title with optional subtitle component. The
 * returned component function takes two args: title, subtitle.
 *
 * @example
 * ```ts
 * const h1 = title();
 * const h2 = title({ element: "h2", attribs: { class: "blue" }});
 *
 * [h1, "Hello world", "Once upon a time..."]
 *
 * [h2, "Chapter 1", "Once upon a time..."]
 * ```
 *
 * @param opts -
 */
export const title = (_opts?: Partial<TitleOpts>) => {
	const opts = {
		element: "h1",
		attribs: {},
		subElement: "small",
		subAttribs: {},
		..._opts,
	};
	return (_: any, title: any, subtitle: any) => [
		opts.element,
		opts.attribs,
		title,
		subtitle ? [opts.subElement, opts.subAttribs, subtitle] : undefined,
	];
};
