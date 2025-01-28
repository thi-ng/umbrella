import type { Interceptor } from "../api.js";

export type CrossOriginResourcePolicy =
	| "same-origin"
	| "same-site"
	| "cross-origin";

/**
 * @remarks
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
 *
 * @param policy
 */
export const crossOriginResourcePolicy = (
	policy: CrossOriginResourcePolicy = "same-origin"
): Interceptor => ({
	pre: (ctx) => (
		ctx.res.setHeader("cross-origin-resource-policy", policy), true
	),
});
