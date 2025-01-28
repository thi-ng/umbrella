import type { Interceptor } from "../api.js";

export type ReferrerPolicy =
	| "no-referrer"
	| "no-referrer-when-downgrade"
	| "origin"
	| "origin-when-cross-origin"
	| "same-origin"
	| "strict-origin"
	| "strict-origin-when-cross-origin"
	| "unsafe-url";

/**
 * @remarks
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
 *
 * @param policy
 */
export const referrerPolicy = (
	policy: ReferrerPolicy = "no-referrer"
): Interceptor => ({
	pre: (ctx) => (ctx.res.setHeader("referrer-policy", policy), true),
});
