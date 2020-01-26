export interface IToHiccup {
    /**
     * Returns a {@link @thi.ng/hiccup# | @thi.ng/hiccup} compatible representation. The optional
     * `ctx` arg is an arbitrary user context object passed to all
     * hiccup components during serialization (or during DOM creation /
     * update if used with {@link @thi.ng/hdom# | @thi.ng/hdom})
     *
     * @param ctx - user context object
     * @param attribs - user attribs
     * @param xs - additional args
     */
    toHiccup(ctx?: any, attribs?: any, ...xs: any[]): any;
}
