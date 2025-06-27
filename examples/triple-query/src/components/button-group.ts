// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api";
import { button } from "./button.js";

export function buttonGroup(ctx: AppContext, ...buttons: any[]) {
	return [
		"section",
		ctx.ui.buttongroup,
		buttons.map((bt) => [button, ...bt]),
	];
}
