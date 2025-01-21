// SPDX-License-Identifier: Apache-2.0
import type { Fn, Maybe } from "@thi.ng/api";
import { rect } from "@thi.ng/geom/rect";
import type { IGridLayout } from "@thi.ng/layout";
import { fit, norm } from "@thi.ng/math/fit";
import { clamp } from "@thi.ng/math/interval";
import { hash } from "@thi.ng/vectors/hash";
import type { ComponentOpts } from "../api.js";
import {
	handleSlider1Keys,
	isHoverSlider,
	slider1Val,
} from "../behaviors/slider.js";
import type { IMGUI } from "../gui.js";
import { valHash } from "../hash.js";
import { layoutBox } from "../layout.js";
import { textLabelRaw } from "./textlabel.js";
import { tooltipRaw } from "./tooltip.js";

export interface SliderOpts extends ComponentOpts {
	min: number;
	max: number;
	step: number;
	value: number;
	fmt?: Fn<number, string>;
}

export const sliderH = ({
	gui,
	layout,
	id,
	min,
	max,
	step,
	value,
	label,
	info,
	fmt,
}: SliderOpts) => {
	const box = layoutBox(layout);
	return sliderHRaw(
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
		label,
		fmt,
		info
	);
};

export interface SliderGroupOpts
	extends Omit<SliderOpts, "layout" | "value" | "label" | "info"> {
	layout: IGridLayout<any>;
	/**
	 * If true (default: false), the sliders will be arranged horizontally.
	 */
	horizontal?: boolean;
	value: number[];
	label: string[];
	info?: string[];
}

export const sliderHGroup = (opts: SliderGroupOpts) => {
	const { layout, id, value, label, info } = opts;
	const n = value.length;
	const nested = opts.horizontal
		? layout.nest(n, [n, 1])
		: layout.nest(1, [1, n]);
	let res: Maybe<number>;
	let idx: number = -1;
	for (let i = 0; i < n; i++) {
		const v = sliderH({
			...opts,
			layout: nested,
			id: `${id}-${i}`,
			value: value[i],
			label: label[i],
			info: info?.[i],
		});
		if (v !== undefined) {
			res = v;
			idx = i;
		}
	}
	return res !== undefined ? [idx, res] : undefined;
};

export const sliderHRaw = (
	gui: IMGUI,
	id: string,
	x: number,
	y: number,
	w: number,
	h: number,
	min: number,
	max: number,
	step: number,
	val: number,
	label?: string,
	fmt?: Fn<number, string>,
	info?: string
) => {
	const theme = gui.theme;
	const key = hash([x, y, w, h]);
	gui.registerID(id, key);
	const box = gui.resource(id, key, () => rect([x, y], [w, h], {}));
	const hover = isHoverSlider(gui, id, box);
	const draw = gui.draw;
	let v: Maybe<number> = clamp(val, min, max);
	let res: Maybe<number>;
	if (hover) {
		if (gui.isMouseDown()) {
			gui.activeID = id;
			res = slider1Val(
				fit(gui.mouse[0], x, x + w - 1, min, max),
				min,
				max,
				step
			);
		}
		info && draw && tooltipRaw(gui, info);
	}
	const focused = gui.requestFocus(id);
	if (draw) {
		const valueBox = gui.resource(id, v, () =>
			rect([x, y], [1 + norm(v!, min, max) * (w - 1), h], {})
		);
		const valLabel = gui.resource(id, valHash(key, v, gui.disabled), () =>
			textLabelRaw(
				[x + theme.pad, y + h / 2 + theme.baseLine],
				gui.textColor(false),
				(label ? label + " " : "") + (fmt ? fmt(v!) : v)
			)
		);
		box.attribs.fill = gui.bgColor(hover || focused);
		box.attribs.stroke = gui.focusColor(id);
		valueBox.attribs.fill = gui.fgColor(hover);
		gui.add(box, valueBox, valLabel);
	}
	if (
		focused &&
		(v = handleSlider1Keys(gui, min, max, step, v)) !== undefined
	) {
		return v;
	}
	gui.lastID = id;
	return res;
};
