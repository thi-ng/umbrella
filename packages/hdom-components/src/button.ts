import { mergeAttribs } from "./utils/merge-attribs";
import type { IObjectOf } from "@thi.ng/api";

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
    onclick: EventListener;
    attribs?: IObjectOf<any>;
    disabled?: boolean;
}

export type Button = (_: any, args: ButtonArgs, ...body: any[]) => any;

/**
 * Higher order function to create a new stateless button component,
 * pre-configured via user supplied options. The returned component
 * function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - partial {@link ButtonArgs} object (extra attribs, onclick, disabled)
 * - body content (varargs)
 *
 * Any `attribs` provided as arg via {@link ButtonArgs} are merged with the
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
        ...opts,
    };
    !opts.attribs.role && (opts.attribs.role = "button");
    return (_: any, args: ButtonArgs, ...body: any[]) =>
        args.disabled
            ? [
                  opts!.tagDisabled,
                  {
                      ...mergeAttribs(opts!.attribsDisabled, args.attribs),
                      disabled: true,
                  },
                  ...body,
              ]
            : [
                  opts!.tag,
                  {
                      ...mergeAttribs(opts!.attribs, args.attribs),
                      onclick: opts!.preventDefault
                          ? (e: Event) => (e.preventDefault(), args.onclick(e))
                          : args.onclick,
                  },
                  ...body,
              ];
};
