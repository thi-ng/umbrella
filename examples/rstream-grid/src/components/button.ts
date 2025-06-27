// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api";
import { eventLink } from "./event-link.js";

export const button = (ctx: AppContext, event: Event, label: string) => [
	eventLink,
	ctx.ui.button,
	event,
	label,
];
