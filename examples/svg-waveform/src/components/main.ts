import type { AppContext } from "../api";
import { SLIDERS } from "../sliders";
import { sidebar } from "./sidebar";
import { waveform } from "./waveform";

export function main(ctx: AppContext) {
	const bar = sidebar(ctx, ...SLIDERS);
	return () => [
		"div",
		ctx.ui.root,
		bar,
		waveform(ctx, {
			phase: ctx.views.phase.deref()!,
			freq: ctx.views.freq.deref()!,
			amp: ctx.views.amp.deref()!,
			harmonics: ctx.views.harmonics.deref()!,
			hstep: ctx.views.hstep.deref()!,
			res: 1000,
			stroke: "#f04",
			fill1: "#f04",
			fill2: "#ff0",
		}),
	];
}
