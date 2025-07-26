// SPDX-License-Identifier: Apache-2.0
import type { Fn, Maybe } from "@thi.ng/api";
import { line } from "@thi.ng/geom/line";
import { rect } from "@thi.ng/geom/rect";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { clamp2 } from "@thi.ng/vectors/clamp";
import { fit2 } from "@thi.ng/vectors/fit";
import { hash } from "@thi.ng/vectors/hash";
import type { ComponentOpts } from "../api.js";
import {
	handleSlider2Keys,
	isHoverSlider,
	slider2Val,
} from "../behaviors/slider.js";
import type { IMGUI } from "../gui.js";
import { textLabelRaw } from "./textlabel.js";
import { tooltipRaw } from "./tooltip.js";

export interface XYPadOpts extends Omit<ComponentOpts, "layout"> {
	layout: IGridLayout<any>;
	min: ReadonlyVec;
	max: ReadonlyVec;
	step: number;
	value: Vec;
	/**
	 * If `square` (default), the component will allocate a square, if `prop` an
	 * area of proportional height (snapped to rows). If given a number > 0, the
	 * component will occupy the given number of rows.
	 */
	mode?: "square" | "prop" | number;
	/**
	 * If true (default), the top-right corner of the XY pad corresponds to the
	 * configured {@link XYPadOpts.max} value. Otherwise, the bottom-right
	 * corner is used.
	 */
	yUp?: boolean;
	fmt?: Fn<Vec, string>;
}

export const xyPad = ({
	gui,
	layout,
	id,
	min,
	max,
	step,
	value,
	mode = "square",
	yUp = true,
	label,
	info,
	fmt,
}: XYPadOpts) => {
	let box: LayoutBox;
	const ch = layout.cellH;
	const gapY = layout.gapY;
	if (mode === "square") {
		box = layout.nextSquare();
	} else {
		const rows = mode === "prop" ? (layout.cellW / (ch + gapY)) | 0 : mode;
		box = layout.next([1, rows + 1]);
		box.h -= ch + gapY;
	}
	return xyPadRaw(
		gui,
		id,
		box.x,
		box.y,
		box.w,
		box.h,
		min,
		max,
		step,
		value,
		yUp,
		0,
		box.h + gapY + ch / 2 + gui.theme.baseLine,
		label,
		fmt,
		info
	);
};

export const xyPadRaw = (
	gui: IMGUI,
	id: string,
	x: number,
	y: number,
	w: number,
	h: number,
	min: Vec,
	max: Vec,
	step: number,
	val: Vec,
	yUp = false,
	labelX: number,
	labelY: number,
	label?: string,
	fmt?: Fn<Vec, string>,
	info?: string
) => {
	const maxX = x + w;
	const maxY = y + h;
	const pos = yUp ? [x, maxY] : [x, y];
	const maxPos = yUp ? [maxX, y] : [maxX, maxY];
	const key = hash([x, y, w, h]);
	gui.registerID(id, key);
	const box = gui.resource(id, key, () => rect([x, y], [w, h]));
	const col = gui.textColor(false);
	const hover = isHoverSlider(gui, id, box, "move");
	const draw = gui.draw;
	let v: Maybe<Vec> = clamp2([], val, min, max);
	let res: Maybe<Vec>;
	if (hover) {
		if (gui.isMouseDown()) {
			gui.activeID = id;
			res = slider2Val(
				fit2([], gui.mouse, pos, maxPos, min, max),
				min,
				max,
				step
			);
		}
		info && draw && tooltipRaw(gui, info);
	}
	const focused = gui.requestFocus(id);
	if (draw) {
		box.attribs = {
			fill: gui.bgColor(hover || focused),
			stroke: gui.focusColor(id),
		};
		const { 0: cx, 1: cy } = fit2([], v, min, max, pos, maxPos);
		gui.add(
			box,
			line([x, cy], [maxX, cy], {
				stroke: col,
			}),
			line([cx, y], [cx, maxY], {
				stroke: col,
			}),
			textLabelRaw(
				[x + labelX, y + labelY],
				col,
				(label ? label + " " : "") +
					(fmt ? fmt(val) : `${val[0] | 0}, ${val[1] | 0}`)
			)
		);
	}
	if (
		focused &&
		(v = handleSlider2Keys(gui, min, max, step, v, yUp)) !== undefined
	) {
		return v;
	}
	gui.lastID = id;
	return res;
};
