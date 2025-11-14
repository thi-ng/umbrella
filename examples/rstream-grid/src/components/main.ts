// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";
import { SLIDERS } from "../sliders.js";
import { sidebar } from "./sidebar.js";

export const main = (ctx: AppContext) => {
	const bar = sidebar(ctx, ...SLIDERS);
	return () => ["div", ctx.ui.root, bar, ctx.views.svg];
};
