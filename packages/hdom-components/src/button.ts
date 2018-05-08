import { IObjectOf } from "@thi.ng/api/api";

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

export interface ButtonArgs {
    attribs: IObjectOf<any>;
    onclick: EventListener;
    disabled: boolean;
}

export type Button = (_: any, args: Partial<ButtonArgs>, ...body: any[]) => any;

/**
 * Higher order function to create a new stateless button component,
 * pre-configured via user supplied options. The returned component
 * function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - partial `ButtonArgs` object (extra attribs, onclick, disabled)
 * - body content (varargs)
 *
 * Any `attribs` provided as arg via `ButtonArgs` are merged with the
 * default options provided to the HOF. The `disabled` arg decides which
 * button version to create. The button can have any number of body
 * elements (e.g. icon and label), given as varargs.
 */
export const button = (opts?: Partial<ButtonOpts>): Button => {
    // init with defaults
    opts = {
        tag: "a",
        tagDisabled: "span",
        preventDefault: true,
        attribs: {},
        ...opts
    };
    !opts.attribs.role && (opts.attribs.role = "button");
    return (_: any, args: Partial<ButtonArgs>, ...body: any[]) =>
        args.disabled ?
            [opts.tagDisabled, {
                ...opts.attribsDisabled,
                ...args.attribs,
                disabled: true,
            }, ...body] :
            [opts.tag, {
                ...opts.attribs,
                ...args.attribs,
                onclick: opts.preventDefault ?
                    (e) => (e.preventDefault(), args.onclick(e)) :
                    args.onclick
            }, ...body];
};
