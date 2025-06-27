// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api";
import { button } from "./button.js";

export const buttonGroup = (ctx: AppContext, ...buttons: any[]) => [
	"section",
	ctx.ui.buttongroup,
	buttons.map((bt) => [button, ...bt]),
];
