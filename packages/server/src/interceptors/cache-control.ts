// SPDX-License-Identifier: Apache-2.0
import { kebab } from "@thi.ng/strings";
import type { Interceptor } from "../api.js";

export interface CacheControlOpts {
	maxAge: number;
	sMaxAge: number;
	noCache: boolean;
	noStore: boolean;
	noTransform: boolean;
	mustRevalidate: boolean;
	proxyRevalidate: boolean;
	mustUnderstand: boolean;
	private: boolean;
	public: boolean;
	immutable: boolean;
	staleWhileRevalidate: boolean;
	staleIfError: boolean;
}

/**
 * @remarks
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
 *
 * @param opts
 */
export const cacheControl = (
	opts: Partial<CacheControlOpts> = {}
): Interceptor => {
	const acc: string[] = [];
	for (let [k, v] of Object.entries(opts)) {
		switch (k) {
			case "maxAge":
				acc.push("max-age=" + v);
				break;
			case "sMaxAge":
				acc.push("s-maxage=" + v);
				break;
			default:
				if (v) acc.push(kebab(k));
		}
	}
	const value = acc.join(", ");
	return {
		pre: (ctx) => (
			value && ctx.res.setHeader("cache-control", value), true
		),
	};
};
