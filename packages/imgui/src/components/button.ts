// SPDX-License-Identifier: Apache-2.0
import type { Fn5 } from "@thi.ng/api";
import type { IShape } from "@thi.ng/geom";
import { rect } from "@thi.ng/geom/rect";
import { ZERO2 } from "@thi.ng/vectors/api";
import { hash } from "@thi.ng/vectors/hash";
import type { ComponentOpts, GUITheme, Hash } from "../api.js";
import { handleButtonKeys, hoverButton } from "../behaviors/button.js";
import type { IMGUI } from "../gui.js";
import { labelHash } from "../hash.js";
import { layoutBox } from "../layout.js";
import { textLabelRaw, textTransformH, textTransformV } from "./textlabel.js";

export interface ButtonOpts extends ComponentOpts {
	/**
	 * Label text when button is in hover state (by default the same as
	 * {@link ComponentOpts.label}).
	 */
	labelHover?: string;
}

export const buttonH = ({
	gui,
	layout,
	id,
	label,
	labelHover,
	info,
}: ButtonOpts) => {
	const { x, y, w, h } = layoutBox(layout);
	const key = hash([x, y, w, h]);
	return buttonRaw(
		gui,
		id,
		gui.resource(id, key, () => rect([x, y], [w, h])),
		key,
		label
			? __mkLabel(gui, textTransformH, id, key, x, y, w, h, false, label)
			: undefined,
		labelHover
			? // prettier-ignore
			  __mkLabel(gui, textTransformH, id, key, x, y, w, h, true, labelHover)
			: undefined,
		info
	);
};

export const buttonV = ({
	gui,
	layout,
	rows,
	id,
	label,
	labelHover,
	info,
}: ButtonOpts & { rows: number }) => {
	const { x, y, w, h } = layoutBox(layout, [1, rows]);
	const key = hash([x, y, w, h]);
	return buttonRaw(
		gui,
		id,
		gui.resource(id, key, () => rect([x, y], [w, h])),
		key,
		label
			? __mkLabel(gui, textTransformV, id, key, x, y, w, h, false, label)
			: undefined,
		labelHover
			? // prettier-ignore
			  __mkLabel(gui, textTransformV, id, key, x, y, w, h, true, labelHover)
			: undefined,
		info
	);
};

export const buttonRaw = (
	gui: IMGUI,
	id: string,
	shape: IShape,
	hash: Hash,
	label?: any,
	labelHover?: any,
	info?: string
) => {
	gui.registerID(id, hash);
	const hover = hoverButton(gui, id, shape, info);
	const focused = gui.requestFocus(id);
	if (gui.draw) {
		shape.attribs = {
			fill: hover ? gui.fgColor(true) : gui.bgColor(focused),
			stroke: gui.focusColor(id),
		};
		gui.add(shape);
		label && gui.add(hover && labelHover ? labelHover : label);
	}
	if (focused && handleButtonKeys(gui)) {
		return true;
	}
	gui.lastID = id;
	// only emit true on mouse release over this button
	// TODO extract as behavior function
	return !gui.buttons && gui.hotID === id && gui.activeID === id;
};

/** @internal */
const __mkLabel = (
	gui: IMGUI,
	tx: Fn5<GUITheme, number, number, number, number, number[]>,
	id: string,
	key: number,
	x: number,
	y: number,
	w: number,
	h: number,
	hover: boolean,
	label: string
) =>
	gui.resource(id, labelHash(key, label, gui.disabled), () =>
		textLabelRaw(
			ZERO2,
			{
				transform: tx(gui.theme, x, y, w, h),
				fill: gui.textColor(hover),
			},
			label
		)
	);
