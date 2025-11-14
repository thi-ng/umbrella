// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";

export const header = (ctx: AppContext, title: string) => [
	"section",
	ctx.ui.header.root,
	["h1", ctx.ui.header.title, title],
];
