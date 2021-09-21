import { map } from "@thi.ng/transducers/map";
import { range } from "@thi.ng/transducers/range";

/**
 * Configuration options for pager components.
 */
export interface PagerOpts {
    /**
     * Function producing a single page nav or counter element. MUST be
     * provided by user.
     *
     * The function is called with:
     *
     * - target page ID
     * - current page ID
     * - max pageID
     * - page label (page number or sourced from these options here)
     * - disabled flag as determined by the pager
     *
     * If `disabled` is true, the function should return a version of
     * the button component reflecting this state to the user. E.g. the
     * "prev page" buttons should be disabled if the first page is
     * currently active. Likewise, the currently selected page button
     * will be set to disabled as well.
     *
     * Page IDs are zero-based indices, whereas page number labels are
     * one-based. The currently active page ID is only provided for
     * special highlighting cases (optional).
     */
    button(
        page: number,
        curr: number,
        max: number,
        label: any,
        disabled: boolean
    ): any;
    /**
     * Pager root component function. Receives all 3 button groups as
     * arguments. Optional. Default: `["div.pager", ...body]`
     */
    root(ctx: any, ...body: any[]): any;
    /**
     * Component function to provide wrapper for the first / prev nav
     * button group. The `first` / `prev` args are button components.
     * Optional. Default: `["div.pager-prev", first, prev]`
     */
    groupPrev(ctx: any, first: any, prev: any): any;
    /**
     * Component function to provide wrapper for the page buttons group.
     * The `buttons` argument is an array of button components.
     * Optional. Default: `["div.pager-pages", ...buttons]`
     */
    groupPages(ctx: any, buttons: any[]): any;
    /**
     * Component function to provide wrapper for the next / last nav
     * button group. The `next` /  `last` args are button components.
     * Optional. Default: `["div.pager-next", next, last]`
     */
    groupNext(ctx: any, next: any, last: any): any;
    /**
     * Page increment for prev / next page buttons. Default: 1
     */
    navStep?: number;
    /**
     * Label for "first page" button. Default: `"<<""`
     */
    labelFirst?: any;
    /**
     * Label for "last page" button. Default: `">>"`
     */
    labelLast?: any;
    /**
     * Label for "prev page" button. Default: `"<"`
     */
    labelPrev?: any;
    /**
     * Label for "next page" button. Default: `">"`
     */
    labelNext?: any;
}

/**
 * Higher order container component for paged navigation buttons. The
 * returned component function takes these arguments:
 *
 * - `ctx` - hdom context object
 * - `id` - current page ID (zero-based)
 * - `numItems` - current number of items
 * - `pageLen` - number of items per page (only used for calculation)
 * - `maxButtons` - number of page buttons to show (default: 5). If
 *   zero, only the prev / next and first / last buttons will be shown.
 *
 * If there are more pages than the specified number, only the
 * neighboring page IDs (relative to the current page) are shown. E.g.
 * If there are 10 pages, the current page ID is 5 and 3 visible page
 * buttons then the pager will look like this (the `|` character here
 * indicates button group boundaries):
 *
 * ```
 * << < | 4 5 6 | > >>
 * ```
 *
 * Providing `pageLen` and `maxButtons` as arguments allows to
 * dynamically control the number of page buttons at runtime, e.g. in
 * response to window resizing.
 *
 * Yields a component of page buttons and prev / next and first / last
 * navigation buttons. The actual button and button group components are
 * defined via the user supplied options. The first / prev and next /
 * last nav buttons are paired within inner `div` elements (one per
 * pair) and can be styled (or hidden) separately.
 *
 * ```
 * // initialization
 * const mypager = pager({
 *   button: (i, curr, max, label, disabled) =>
 *     ["a", {href: `/page/${i}`, disabled}, label]
 * });
 *
 * // usage
 * [mypager, currPage, currNumItems, 10, 5]
 * ```
 *
 * @param opts -
 */
export const pager = (_opts: PagerOpts) => {
    const opts = <PagerOpts>{
        navStep: 1,
        labelFirst: "<<",
        labelPrev: "<",
        labelNext: ">",
        labelLast: ">>",
        ..._opts,
    };
    return (_: any, id: number, num: number, pageLen = 10, maxBts = 5) => {
        const bt = opts.button;
        const step = opts.navStep;
        const maxID = Math.floor(Math.max(0, num - 1) / pageLen);
        id = Math.max(Math.min(id, maxID), 0);
        return [
            opts.root,
            [
                opts.groupPrev,
                bt(0, id, maxID, opts.labelFirst, !id),
                bt(Math.max(id - step!, 0), id, maxID, opts.labelPrev, !id),
            ],
            [
                opts.groupPages,
                map(
                    (i: number) => bt(i, id, maxID, i + 1, i === id),
                    pageRange(id, maxID, maxBts)
                ),
            ],
            [
                opts.groupNext,
                bt(
                    Math.min(id + step!, maxID),
                    id,
                    maxID,
                    opts.labelNext,
                    id >= maxID
                ),
                bt(maxID, id, maxID, opts.labelLast, id >= maxID),
            ],
        ];
    };
};

const pageRange = (id: number, maxID: number, maxBt: number) => {
    if (maxID > maxBt - 1) {
        const from = Math.max(
            Math.min(id - (maxBt >> 1), maxID - maxBt + 1),
            0
        );
        return range(from, from + maxBt);
    }
    return range(0, maxID + 1);
};
