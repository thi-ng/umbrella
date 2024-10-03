import type { Fn, Maybe } from "@thi.ng/api";
import { rect } from "@thi.ng/geom/rect";
import { fit, norm } from "@thi.ng/math/fit";
import { ZERO2 } from "@thi.ng/vectors/api";
import { hash } from "@thi.ng/vectors/hash";
import {
	handleSlider1Keys,
	isHoverSlider,
	slider1Val,
} from "../behaviors/slider.js";
import type { IMGUI } from "../gui.js";
import { valHash } from "../hash.js";
import { layoutBox } from "../layout.js";
import type { SliderGroupOpts, SliderOpts } from "./sliderh.js";
import { textLabelRaw, textTransformV } from "./textlabel.js";
import { tooltipRaw } from "./tooltip.js";

export const sliderV = ({
	gui,
	layout,
	id,
	rows,
	min,
	max,
	step,
	value,
	label,
	info,
	fmt,
}: SliderOpts & { rows: number }) => {
	const box = layoutBox(layout, [1, rows]);
	return sliderVRaw(
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

export interface SliderVGroupOpts extends Omit<SliderGroupOpts, "horizontal"> {
	rows: number;
}

export const sliderVGroup = (opts: SliderVGroupOpts) => {
	const { id, value, label, info } = opts;
	const n = value.length;
	const layout = opts.layout.nest(n, [1, opts.rows]);
	let res: Maybe<number>;
	let idx: number = -1;
	for (let i = 0; i < n; i++) {
		const v = sliderV({
			...opts,
			layout,
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

export const sliderVRaw = (
	gui: IMGUI,
	id: string,
	x: number,
	y: number,
	w: number,
	h: number,
	min: number,
	max: number,
	prec: number,
	val: number,
	label?: string,
	fmt?: Fn<number, string>,
	info?: string
) => {
	const theme = gui.theme;
	const key = hash([x, y, w, h]);
	gui.registerID(id, key);
	const box = gui.resource(id, key, () => rect([x, y], [w, h], {}));
	const ymax = y + h;
	const hover = isHoverSlider(gui, id, box, "ns-resize");
	const draw = gui.draw;
	let v: Maybe<number> = val;
	let res: Maybe<number>;
	if (hover) {
		if (gui.isMouseDown()) {
			gui.activeID = id;
			res = slider1Val(
				fit(gui.mouse[1], ymax - 1, y, min, max),
				min,
				max,
				prec
			);
		}
		info && draw && tooltipRaw(gui, info);
	}
	const focused = gui.requestFocus(id);
	if (draw) {
		const valueBox = gui.resource(id, v, () => {
			const nh = norm(v!, min, max) * (h - 1);
			return rect([x, ymax - nh], [w, nh], {});
		});
		const valLabel = gui.resource(id, valHash(key, v, gui.disabled), () =>
			textLabelRaw(
				ZERO2,
				{
					transform: textTransformV(theme, x, y, w, h),
					fill: gui.textColor(false),
				},
				(label ? label + " " : "") + (fmt ? fmt(v!) : v)
			)
		);
		valueBox.attribs.fill = gui.fgColor(hover);
		box.attribs.fill = gui.bgColor(hover || focused);
		box.attribs.stroke = gui.focusColor(id);
		gui.add(box, valueBox, valLabel);
	}
	if (
		focused &&
		(v = handleSlider1Keys(gui, min, max, prec, v)) !== undefined
	) {
		return v;
	}
	gui.lastID = id;
	return res;
};
