export interface ButtonOpts {
    /**
     * Element name to use for enabled buttons.
     * Default: "a"
     */
    tag: string;
    /**
     * Element name to use for disabled buttons.
     * Default: "span"
     */
    tagDisabled: string;
    /**
     * Attribute object to use for enabled buttons.
     * Default: none
     */
    attribs: any;
    /**
     * Attribute object to use for disabled buttons.
     * Default: none
     */
    attribsDisabled: any;
    /**
     * Flag to indicate if user supplied `onclick` handler
     * should be wrapped in a function which automatically
     * calls `preventDefault()`.
     * Default: true
     */
    preventDefault: boolean;
}

/**
 * Higher order function to create a new stateless button component,
 * pre-configured via user supplied options. The returned component
 * function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - extra attribute object
 * - onclick event listener
 * - body content
 * - disabled flag (default: false)
 *
 * The `attribs` provided as arg are merged with the default options
 * provided to HOF. The `disabled` arg decides which button version
 * to create.
 */
export const button = (opts: Partial<ButtonOpts>) => {
    // init with defaults
    opts = {
        tag: "a",
        tagDisabled: "span",
        preventDefault: true,
        ...opts
    };
    // return component function as closure
    return (_: any, attribs: any, onclick: EventListener, body: any, disabled?: boolean) =>
        disabled ?
            [opts.tagDisabled, {
                ...opts.attribsDisabled,
                ...attribs,
                disabled: true,
            }, body] :
            [opts.tag, {
                ...opts.attribs,
                ...attribs,
                onclick: opts.preventDefault ?
                    (e) => (e.preventDefault(), onclick(e)) :
                    onclick
            }, body];
};
