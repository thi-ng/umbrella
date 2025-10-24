// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";
import * as ev from "../events.js";
import { buttonGroup } from "./button-group.js";
import { link } from "./link.js";
import { slider, type SliderOpts } from "./slider.js";

export function sidebar(ctx: AppContext, ...specs: SliderOpts[]) {
	const sliders = specs.map((s) => slider(ctx, s));
	return [
		"div",
		ctx.ui.sidebar,
		["h2.mt0", "Additive synthesis"],
		...sliders,
		[buttonGroup, [[ev.UNDO], "undo"], [[ev.REDO], "redo"]],
		[
			"div",
			"Undo / Redo can also be triggered via ",
			["code", "Ctrl+Z"],
			" / ",
			["code", "Ctrl+Y"],
			". The last 1000 edits are stored.",
		],
		[
			"div",
			ctx.ui.footer,
			[
				link,
				"https://github.com/thi-ng/umbrella/tree/develop/examples/svg-waveform",
				"Source",
			],
			["br"],
			"Made with ",
			[
				link,
				"https://github.com/thi-ng/umbrella/tree/develop/packages/hdom",
				"@thi.ng/hdom",
			],
		],
	];
}
