import type { Interceptor } from "../api.js";

/**
 * Pre-interceptor to inject given headers into the response.
 *
 * @param headers
 */
export const injectHeaders = (
	headers: Record<string, string | string[]>
): Interceptor => ({
	pre: (ctx) => {
		for (let header of Object.entries(headers)) {
			ctx.res.appendHeader(...header);
		}
		return true;
	},
});
