import { range } from "@thi.ng/iterators/range";
import { map } from "@thi.ng/iterators/map";

/**
 * Configuration options for pager components.
 */
export interface PagerOpts {
    /**
     * Function producing a single page nav or counter element. MUST be
     * provided by user. All other opts are optional.
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
     * the button component reflecting this state to the user. I.e. the
     * "prev page" buttons should be disabled if the first page is
     * currently active.
     *
     * Page IDs are zero-based indices, whereas page number labels are
     * one-based. The currently active page ID is only provided for
     * special highlighting cases (optional).
     */
    button: (page: number, curr: number, max: number, label: any, disabled: boolean) => any;
    /**
     * Attribs for pager root element
     */
    attribs?: any;
    /**
     * Attribs for prev page button group
     */
    prevAttribs?: any;
    /**
     * Attribs for next page button group
     */
    nextAttribs?: any;
    /**
     * Number of numbered page buttons to show. If zero, only the
     * prev/next and first/last buttons will be shown. Default: 5
     */
    maxButtons?: number;
    /**
     * Number of items per page. Used to compute max page count.
     * Default: 10
     */
    pageLen?: number;
    /**
     * Page offset for prev / next pages. Default: 1
     */
    navStep?: number;
    /**
     * Label for "first page" button. Default: "<<"
     */
    labelFirst?: any;
    /**
     * Label for "last page" button. Default: ">>"
     */
    labelLast?: any;
    /**
     * Label for "prev page" button. Default: "<"
     */
    labelPrev?: any;
    /**
     * Label for "next page" button. Default: ">"
     */
    labelNext?: any;
}

/**
 * Higher order component for paged navigation buttons. The returned
 * component function takes two arguments: current number of items and
 * current page ID (zero-based) and yields a component of page buttons
 * and prev / next and first / last navigation buttons. The actual
 * button components are defined via the user supplied `button` option.
 * The first / prev and next / last nav buttons are paired within inner
 * `div` elements (one per pair) and can be styled (or hidden)
 * separately.
 *
 * ```
 * // initialization
 * const mypager = pager({
 *   button: (i, label, disabled) => ["a", {href: `/page/${i}`}, label],
 *   attribs: { class: "pager w-100 tc mv3" },
 *   prevAttribs: { class: "pager-nav fl mr3" },
 *   nextAttribs: { class: "pager-nav fr ml3" },
 * });
 *
 * // usage
 * [mypager, currNumItems, currPage]
 * ```
 *
 * @param opts
 */
export const pager = (opts: PagerOpts) => {
    opts = Object.assign({
        maxButtons: 5,
        pageLen: 10,
        navStep: 1,
        attribs: {},
        prevAttribs: {},
        nextAttribs: {},
        labelFirst: "<<",
        labelPrev: "<",
        labelNext: ">",
        labelLast: ">>",
    }, opts);
    return (_, num: number, id: number) => {
        const bt = opts.button;
        const step = opts.navStep;
        const maxID = Math.floor(Math.max(0, num - 1) / opts.pageLen);
        id = Math.max(Math.min(id, maxID), 0);
        return ["div", opts.attribs,
            ["div", opts.prevAttribs,
                bt(0, id, maxID, opts.labelFirst, !id),
                bt(Math.max(id - step, 0), id, maxID, opts.labelPrev, !id)],
            map(
                (i: number) => bt(i, id, maxID, i + 1, i === id),
                pageRange(id, maxID, opts.maxButtons)
            ),
            ["div", opts.nextAttribs,
                bt(Math.min(id + step, maxID), id, maxID, opts.labelNext, id >= maxID),
                bt(maxID, id, maxID, opts.labelLast, id >= maxID)],
        ];
    };
};

const pageRange = (id: number, maxID: number, maxBt: number) => {
    if (maxID > maxBt - 1) {
        const from = Math.max(Math.min(id - (maxBt >> 1), maxID - maxBt + 1), 0);
        return range(from, from + maxBt);
    }
    return range(0, maxID + 1);
};
