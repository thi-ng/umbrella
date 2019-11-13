export interface IToHiccup {
    /**
     * Returns a {@link @thi.ng/hiccup} compatible representation. The optional
     * `ctx` arg is an arbitrary user context object passed to all
     * hiccup components during serialization (or during DOM creation /
     * update if used with {@link thi.ng/hdom})
     *
     * @param ctx - user context object
     */
    toHiccup(ctx?: any): any;
}
