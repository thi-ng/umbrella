// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";

export const link = (ctx: AppContext, href: string, ...body: any[]) => [
	"a",
	{ ...ctx.ui.link, href },
	...body,
];
