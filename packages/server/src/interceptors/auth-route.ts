// SPDX-License-Identifier: Apache-2.0
import type { Predicate } from "@thi.ng/api";
import type { Interceptor, RequestCtx } from "../api.js";

/**
 * Pre-interceptor. Checks if current route has `auth` flag enabled and if so
 * applies given predicate function to {@link RequestCtx}. If the predicate
 * returns false, the server responds with {@link Server.unauthorized} and any
 * following pre-interceptors and the main route handler will be skipped. Only
 * post-interceptors (if any) will still be executed.
 *
 * @remarks
 * If this interceptor is used with the {@link serverSession} interceptor, it
 * MUST come after it, otherwise the session information will not yet be
 * available in the context object given to the predicate.
 *
 * @param pred
 */
export const authenticateWith = <CTX extends RequestCtx>(
	pred: Predicate<CTX>
): Interceptor<CTX> => ({
	pre: (ctx) => {
		if (ctx.route.auth && !pred(ctx)) {
			ctx.res.unauthorized();
			return false;
		}
		return true;
	},
});
