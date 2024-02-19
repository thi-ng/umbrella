import type { NumericArray } from "@thi.ng/api";
import type { BlendFn } from "./api.js";
import { barChartVLines } from "./bars.js";
import type { Canvas } from "./canvas.js";
import { blendBarsVAdd, blitBarsV } from "./image.js";
import { textLines } from "./text.js";

export interface PlotBarsVOpts {
	min: number;
	max: number;
	blend?: BlendFn;
}

interface PlotSpec {
	data: NumericArray;
	color: number;
}

export const plotBarsV = (
	canv: Canvas,
	opts: PlotBarsVOpts,
	...plots: PlotSpec[]
) => {
	const channel = canv.empty();
	const blend = opts.blend || blendBarsVAdd;
	for (let plot of plots) {
		channel.clear();
		textLines(
			channel,
			0,
			0,
			barChartVLines(channel.height, plot.data, opts.min, opts.max),
			plot.color
		);
		blitBarsV(canv, channel, 0, 0, blend);
	}
	return canv;
};
