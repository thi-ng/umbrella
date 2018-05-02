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
 * ```
 * const h1 = title();
 * const h2 = title({ element: "h2", attribs: { class: "blue" }});
 *
 * [h1, "Hello world", "Once upon a time..."]
 *
 * [h2, "Chapter 1", "Once upon a time..."]
 * ```
 *
 * @param opts
 */
export const title = (opts?: Partial<TitleOpts>) => {
    opts = Object.assign(<TitleOpts>{
        element: "h1",
        attribs: {},
        subElement: "small",
        subAttribs: {},
    }, opts);
    return (_, title, subtitle) =>
        [opts.element, opts.attribs, title,
        subtitle ?
            [opts.subElement, opts.subAttribs, subtitle] :
            undefined];
};
