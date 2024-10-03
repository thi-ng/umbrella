import type { Maybe } from "@thi.ng/api";
import { rect } from "@thi.ng/geom/rect";
import { hash } from "@thi.ng/vectors/hash";
import type { ComponentOpts } from "../api.js";
import { handleButtonKeys, hoverButton } from "../behaviors/button.js";
import type { IMGUI } from "../gui.js";
import { layoutBox } from "../layout.js";
import { textLabelRaw } from "./textlabel.js";

export interface ToggleOpts extends ComponentOpts {
	/**
	 * If `square` is true (default: false), the clickable area will not fill
	 * the entire cell, but only a left-aligned square of cell/row height.
	 */
	square?: boolean;
	value: boolean;
}

export const toggle = ({
	gui,
	layout,
	id,
	value,
	square,
	label,
	info,
}: ToggleOpts) => {
	const { x, y, w, h } = layoutBox(layout);
	return toggleRaw(
		gui,
		id,
		x,
		y,
		square ? h : w,
		h,
		square ? h : 0,
		value,
		label,
		info
	);
};

export const toggleRaw = (
	gui: IMGUI,
	id: string,
	x: number,
	y: number,
	w: number,
	h: number,
	lx: number,
	val: boolean,
	label?: string,
	info?: string
) => {
	const theme = gui.theme;
	const key = hash([x, y, w, h]);
	gui.registerID(id, key);
	let res: Maybe<boolean>;
	const box = gui.resource(id, key, () => rect([x, y], [w, h]));
	const hover = hoverButton(gui, id, box, info);
	const focused = gui.requestFocus(id);
	let changed = !gui.buttons && gui.hotID === id && gui.activeID === id;
	focused && (changed = handleButtonKeys(gui) || changed);
	changed && (res = val = !val);
	if (gui.draw) {
		box.attribs = {
			fill: val ? gui.fgColor(hover) : gui.bgColor(hover),
			stroke: gui.focusColor(id),
		};
		gui.add(box);
		label &&
			gui.add(
				textLabelRaw(
					[x + theme.pad + lx, y + h / 2 + theme.baseLine],
					gui.textColor(hover && lx > 0 && lx < w - theme.pad),
					label
				)
			);
	}
	gui.lastID = id;
	return res;
};
