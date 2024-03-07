import type { NumericArray } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { peek } from "@thi.ng/arrays/peek";
import { fitClamped } from "@thi.ng/math/fit";
import { minMax } from "@thi.ng/math/interval";
import { max as $max } from "@thi.ng/transducers/max";
import { min as $min } from "@thi.ng/transducers/min";
import type { BlendFn } from "./api.js";
import { barChartVLines } from "./bars.js";
import { Canvas } from "./canvas.js";
import { formatCanvas } from "./format.js";
import { blendBarsVAdd, blitBarsV } from "./image.js";
import { textLines } from "./text.js";

export interface PlotBarsVOpts {
	min: number;
	max: number;
	blend?: BlendFn;
}

export interface PlotSpec {
	data: NumericArray;
	color: number;
}

export const plotBarChartV = (
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

export const plotLineChart = (
	canvas: Canvas,
	x: number,
	y: number,
	height: number,
	vals: Iterable<number>,
	min?: number,
	max?: number,
	format = canvas.format
) => {
	const $vals = ensureArray(vals);
	min = min !== undefined ? min : $min($vals);
	max = max !== undefined ? max : $max($vals);
	height--;
	format <<= 16;
	const { x1, x2 } = peek(canvas.clipRects);
	for (let i = 0, n = $vals.length - 1; i < n; i++) {
		const xx = x + i;
		if (xx < x1) continue;
		if (xx > x2) break;
		const ya = Math.round(fitClamped($vals[i], min, max, height, 0)) + y;
		const yb =
			Math.round(fitClamped($vals[i + 1], min, max, height, 0)) + y;
		if (ya === yb) {
			canvas.setAt(xx, ya, 0x2500 | format); // ─
		} else {
			// vline to new Y
			let [y1, y2] = minMax(ya, yb);
			while (++y1 < y2) canvas.setAt(xx, y1, 0x2502 | format); // │
			// end points
			canvas.setAt(xx, ya, (ya < yb ? 0x256e : 0x256f) | format); // ╮ ╯
			canvas.setAt(xx, yb, (ya < yb ? 0x2570 : 0x256d) | format); // ╰ ╭
		}
	}
};

export const lineChartStr = (
	height: number,
	vals: Iterable<number>,
	min?: number,
	max?: number
) => {
	const $vals = ensureArray(vals);
	const surf = new Canvas($vals.length, height);
	plotLineChart(surf, 0, 0, height, $vals, min, max);
	return formatCanvas(surf);
};
