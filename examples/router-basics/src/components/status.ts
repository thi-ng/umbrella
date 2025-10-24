// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";

/**
 * Status line component
 *
 * @param ctx - njected context object
 */
export function status(ctx: AppContext) {
	const [type, msg] = ctx.views.status.deref()!;
	return ["p", ctx.ui.status[type], msg];
}
