import type { NumOrString } from "@thi.ng/api";
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import { peek } from "@thi.ng/arrays/peek";
import { liangBarsky2Raw } from "@thi.ng/geom-clip-line/liang-barsky";
import { fitClamped } from "@thi.ng/math/fit";
import { minMax } from "@thi.ng/math/interval";
import { max as $max } from "@thi.ng/transducers/max";
import { min as $min } from "@thi.ng/transducers/min";
import { Canvas } from "./canvas.js";
import { formatCanvas } from "./format.js";
import { charCode } from "./utils.js";

/**
 * Draws a line between `ax`,`ay` and `bx`,`by`, using `char` and taking
 * the current clip rect and format into account. If `char` is not
 * given, uses current style's `dot` char.
 *
 * @param canvas -
 * @param ax -
 * @param ay -
 * @param bx -
 * @param by -
 * @param char -
 */
export const line = (
	canvas: Canvas,
	ax: number,
	ay: number,
	bx: number,
	by: number,
	char?: NumOrString,
	format = canvas.format
) => {
	const { x1, y1, x2, y2 } = peek(canvas.clipRects);
	const clipped = liangBarsky2Raw(ax, ay, bx, by, x1, y1, x2, y2);
	if (!clipped) return;
	ax = clipped[0] | 0;
	ay = clipped[1] | 0;
	bx = clipped[2] | 0;
	by = clipped[3] | 0;
	const dx = Math.abs(bx - ax);
	const dy = -Math.abs(by - ay);
	const w = canvas.width;

	let sx = ax < bx ? 1 : -1;
	let sy = ay < by ? 1 : -1;
	let err = dx + dy;

	char = charCode(
		char !== undefined ? char : peek(canvas.styles).dot,
		format
	);

	while (true) {
		canvas.data[ax + ay * w] = char;
		if (ax === bx && ay === by) return;
		let t = err << 1;
		if (t < dx) {
			err += dx;
			ay += sy;
		}
		if (t > dy) {
			err += dy;
			ax += sx;
		}
	}
};

export const lineChart = (
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
	lineChart(surf, 0, 0, height, $vals, min, max);
	return formatCanvas(surf);
};
