import type { Fn, Maybe } from "@thi.ng/api";
import { circle } from "@thi.ng/geom/circle";
import { line } from "@thi.ng/geom/line";
import type { IGridLayout } from "@thi.ng/layout";
import { isLayout } from "@thi.ng/layout/checks";
import { HALF_PI, PI, TAU } from "@thi.ng/math/api";
import { norm } from "@thi.ng/math/fit";
import { clamp } from "@thi.ng/math/interval";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { hash } from "@thi.ng/vectors/hash";
import type { ComponentOpts } from "../api.js";
import { dialVal } from "../behaviors/dial.js";
import { handleSlider1Keys, isHoverSlider } from "../behaviors/slider.js";
import type { IMGUI } from "../gui.js";
import { dialValueLabel } from "./textlabel.js";
import { tooltipRaw } from "./tooltip.js";

export interface DialOpts extends ComponentOpts {
	min: number;
	max: number;
	step: number;
	value: number;
	fmt?: Fn<number, string>;
}

export const dial = ({
	gui,
	layout,
	id,
	min,
	max,
	step,
	value,
	label,
	fmt,
	info,
}: DialOpts) => {
	const { x, y, w, h, ch } = isLayout(layout) ? layout.nextSquare() : layout;
	return dialRaw(
		gui,
		id,
		x,
		y,
		w,
		h,
		min,
		max,
		step,
		value,
		gui.theme.pad,
		h + ch / 2 + gui.theme.baseLine,
		label,
		fmt,
		info
	);
};

export interface DialGroupOpts
	extends Omit<DialOpts, "layout" | "value" | "label" | "info"> {
	layout: IGridLayout<any>;
	value: number[];
	label: string[];
	info?: string[];
	/**
	 * If true (default), the dials will be arranged horizontally.
	 */
	horizontal?: boolean;
	fmt?: Fn<number, string>;
}

export const dialGroup = (opts: DialGroupOpts) => {
	const { layout, id, value, label, info } = opts;
	const n = opts.value.length;
	const nested =
		opts.horizontal !== false
			? layout.nest(n, [n, 1])
			: layout.nest(1, [1, (layout.rowsForHeight(layout.cellW) + 1) * n]);
	let res: Maybe<number>;
	let idx: number = -1;
	for (let i = 0; i < n; i++) {
		const v = dial({
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

export const dialRaw = (
	gui: IMGUI,
	id: string,
	x: number,
	y: number,
	w: number,
	h: number,
	min: number,
	max: number,
	step: number,
	value: number,
	labelX: number,
	labelY: number,
	label?: string,
	fmt?: Fn<number, string>,
	info?: string
) => {
	const r = Math.min(w, h) / 2;
	const pos = [x + w / 2, y + h / 2];
	const thetaGap = PI / 2;
	const startTheta = HALF_PI + thetaGap / 2;
	const key = hash([x, y, r]);
	gui.registerID(id, key);
	const bgShape = gui.resource(id, key, () => circle(pos, r, {}));
	const hover = isHoverSlider(gui, id, bgShape, "pointer");
	const draw = gui.draw;
	let v: Maybe<number> = clamp(value, min, max);
	let res: Maybe<number>;
	if (hover) {
		gui.hotID = id;
		if (gui.isMouseDown()) {
			gui.activeID = id;
			res = dialVal(gui.mouse, pos, startTheta, thetaGap, min, max, step);
		}
		info && draw && tooltipRaw(gui, info);
	}
	const focused = gui.requestFocus(id);
	if (draw) {
		const valShape = gui.resource(id, v, () =>
			line(
				cartesian2(
					null,
					[r, startTheta + (TAU - thetaGap) * norm(v!, min, max)],
					pos
				),
				pos,
				{}
			)
		);
		const valLabel = dialValueLabel(
			gui,
			id,
			key,
			v,
			x + labelX,
			y + labelY,
			label,
			fmt
		);
		bgShape.attribs.fill = gui.bgColor(hover || focused);
		bgShape.attribs.stroke = gui.focusColor(id);
		valShape.attribs.stroke = gui.fgColor(hover);
		valShape.attribs.weight = 2;
		gui.add(bgShape, valShape, valLabel);
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
