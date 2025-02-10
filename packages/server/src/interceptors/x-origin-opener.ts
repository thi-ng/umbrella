// SPDX-License-Identifier: Apache-2.0
import type { Interceptor } from "../api.js";

export type CrossOriginOpenerPolicy =
	| "unsafe-none"
	| "same-origin-allow-popups"
	| "same-origin"
	| "noopener-allow-popups";

/**
 * @remarks
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
 *
 * @param policy
 */
export const crossOriginOpenerPolicy = (
	policy: CrossOriginOpenerPolicy = "same-origin"
): Interceptor => ({
	pre: (ctx) => (
		ctx.res.setHeader("cross-origin-opener-policy", policy), true
	),
});
