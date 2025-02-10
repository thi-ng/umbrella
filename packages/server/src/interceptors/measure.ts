// SPDX-License-Identifier: Apache-2.0
import {
	methodForLevel,
	type LogLevel,
	type LogLevelName,
} from "@thi.ng/logger";
import { now, timeDiff, type Timestamp } from "@thi.ng/timestamp";
import type { Interceptor, RequestCtx } from "../api.js";

/**
 * Pre/post interceptor to measure & log a request's processing time.
 *
 * @param level
 */
export const measure = (
	level: LogLevel | LogLevelName = "DEBUG"
): Interceptor => {
	const requests = new WeakMap<RequestCtx, Timestamp>();
	const method = methodForLevel(level);
	return {
		pre: (ctx) => {
			requests.set(ctx, now());
			return true;
		},
		post: (ctx) => {
			const t0 = requests.get(ctx)!;
			if (t0) {
				requests.delete(ctx);
				ctx.logger[method](
					`request processed in: ${timeDiff(t0).toFixed(3)}ms`
				);
			}
			return true;
		},
	};
};
