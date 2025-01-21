// SPDX-License-Identifier: Apache-2.0
import type { FnN4 } from "@thi.ng/api";
import type { IShape } from "@thi.ng/geom";
import { pointInside } from "@thi.ng/geom/point-inside";
import { clamp } from "@thi.ng/math/interval";
import { roundTo } from "@thi.ng/math/prec";
import type { Vec } from "@thi.ng/vectors";
import { add2 } from "@thi.ng/vectors/add";
import { clamp2 } from "@thi.ng/vectors/clamp";
import { roundN2 } from "@thi.ng/vectors/round";
import { Key } from "../api.js";
import type { IMGUI } from "../gui.js";

export const isHoverSlider = (
	gui: IMGUI,
	id: string,
	shape: IShape,
	cursor = "ew-resize"
) => {
	if (gui.disabled) return false;
	const aid = gui.activeID;
	const hover = aid === id || (aid === "" && pointInside(shape, gui.mouse));
	if (hover) {
		gui.setCursor(cursor);
		gui.hotID = id;
	}
	return hover;
};

export const slider1Val: FnN4 = (x, min, max, prec) =>
	clamp(roundTo(x, prec), min, max);

export const slider2Val = (v: Vec, min: Vec, max: Vec, prec: number) =>
	clamp2(null, roundN2([], v, prec), min, max);

export const handleSlider1Keys = (
	gui: IMGUI,
	min: number,
	max: number,
	prec: number,
	value: number
) => {
	switch (gui.key) {
		case Key.TAB:
			gui.switchFocus();
			break;
		case Key.UP:
		case Key.DOWN: {
			const step =
				(gui.key === Key.UP ? prec : -prec) *
				(gui.isShiftDown() ? 5 : 1);
			return slider1Val(value + step, min, max, prec);
		}
		default:
	}
};

export const handleSlider2Keys = (
	gui: IMGUI,
	min: Vec,
	max: Vec,
	prec: number,
	value: Vec,
	yUp: boolean
) => {
	switch (gui.key) {
		case Key.TAB:
			gui.switchFocus();
			break;
		case Key.LEFT:
		case Key.RIGHT: {
			const step =
				(gui.key === Key.RIGHT ? prec : -prec) *
				(gui.isShiftDown() ? 5 : 1);
			return slider2Val(add2([], value, [step, 0]), min, max, prec);
		}
		case Key.UP:
		case Key.DOWN: {
			const step =
				(gui.key === Key.UP ? prec : -prec) *
				(yUp ? 1 : -1) *
				(gui.isShiftDown() ? 5 : 1);
			return slider2Val(add2([], value, [0, step]), min, max, prec);
		}
		default:
	}
};
