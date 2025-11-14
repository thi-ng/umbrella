// SPDX-License-Identifier: Apache-2.0
export interface IToHiccup {
	/**
	 * Returns a [thi.ng/hiccup](https://thi.ng/hiccup) compatible
	 * representation. The optional `ctx` arg is an arbitrary user context
	 * object passed to all hiccup components during serialization (or during
	 * DOM creation / update if used with [thi.ng/hdom](https://thi.ng/hdom)).
	 *
	 * @param ctx - user context object
	 * @param attribs - user attribs
	 * @param args - additional args
	 */
	toHiccup(ctx?: any, attribs?: any, ...args: any[]): any;
}
