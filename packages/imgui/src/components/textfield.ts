import type { Predicate } from "@thi.ng/api";
import { rect } from "@thi.ng/geom/rect";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { fitClamped } from "@thi.ng/math/fit";
import { hash } from "@thi.ng/vectors/hash";
import { isHoverSlider } from "../behaviors/slider.js";
import { handleTextfieldKeys } from "../behaviors/text.js";
import type { IMGUI } from "../gui.js";
import { layoutBox } from "../layout.js";
import { textLabelRaw } from "./textlabel.js";
import { tooltipRaw } from "./tooltip.js";

export const textField = (
	gui: IMGUI,
	layout: IGridLayout | LayoutBox,
	id: string,
	label: string,
	filter: Predicate<string> = () => true,
	info?: string
) => {
	const box = layoutBox(layout);
	return textFieldRaw(
		gui,
		id,
		box.x,
		box.y,
		box.w,
		box.h,
		label,
		filter,
		info
	);
};

export const textFieldRaw = (
	gui: IMGUI,
	id: string,
	x: number,
	y: number,
	w: number,
	h: number,
	txt: string,
	filter: Predicate<string> = () => true,
	info?: string
) => {
	const theme = gui.theme;
	const cw = theme.charWidth;
	const pad = theme.pad;
	const maxLen = Math.max(1, ((w - pad * 2) / cw) | 0);
	const txtLen = txt.length;
	const state = gui.state(id, () => ({ cursor: 0, offset: 0 }));
	const drawTxt = txt.substring(state.offset, state.offset + maxLen);
	const key = hash([x, y, w, h]);
	gui.registerID(id, key);
	const box = gui.resource(id, key, () => rect([x, y], [w, h], {}));
	const hover = isHoverSlider(gui, id, box, "text");
	const draw = gui.draw;
	if (hover) {
		if (gui.isMouseDown()) {
			gui.activeID = id;
			state.cursor = Math.min(
				Math.round(
					fitClamped(
						gui.mouse[0],
						x + pad,
						x + w - pad,
						state.offset,
						state.offset + maxLen
					)
				),
				txtLen
			);
		}
		info && draw && tooltipRaw(gui, info);
	}
	const focused = gui.requestFocus(id);
	if (draw) {
		box.attribs.fill = gui.bgColor(focused || hover);
		box.attribs.stroke = gui.focusColor(id);
		gui.add(
			box,
			textLabelRaw(
				[x + pad, y + h / 2 + theme.baseLine],
				gui.textColor(focused),
				drawTxt
			)
		);
	}
	if (focused) {
		const { cursor, offset } = state;
		const drawCursor = Math.min(cursor - offset, maxLen);
		if (draw) {
			const xx = x + pad + drawCursor * cw;
			(gui.time * theme.cursorBlink) % 1 < 0.5 &&
				gui.add([
					"line",
					{ stroke: theme.cursor },
					[xx, y + 4],
					[xx, y + h - 4],
				]);
		}

		const res = handleTextfieldKeys(
			gui,
			state,
			filter,
			txt,
			cursor,
			drawCursor,
			maxLen
		);
		if (res !== undefined) return res;
	}
	gui.lastID = id;
};
