import type { Interceptor } from "../api.js";

/**
 * @remarks
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
 *
 * @param maxAge
 * @param includeSubDomains
 */
export const strictTransportSecurity = (
	maxAge = 63072000,
	includeSubDomains = true
): Interceptor => {
	const value = `max-age=${maxAge}${
		includeSubDomains ? "; includeSubDomains" : ""
	}`;
	return {
		pre: (ctx) => (
			ctx.res.setHeader("strict-transport-security", value), true
		),
	};
};
