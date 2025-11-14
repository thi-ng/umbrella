// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { group } from "@thi.ng/geom/group";
import { line } from "@thi.ng/geom/line";
import { polygon } from "@thi.ng/geom/polygon";
import { rect } from "@thi.ng/geom/rect";
import { triangle } from "@thi.ng/geom/triangle";
import { mix } from "@thi.ng/math/mix";
import { roundTo } from "@thi.ng/math/prec";
import type { Frame, Ramp } from "@thi.ng/ramp";
import { map } from "@thi.ng/transducers/map";
import { ONE2, ZERO2, type Vec } from "@thi.ng/vectors/api";
import { clamp01_2 } from "@thi.ng/vectors/clamp01";
import { fit2 } from "@thi.ng/vectors/fit";
import { hash } from "@thi.ng/vectors/hash";
import { mix2 } from "@thi.ng/vectors/mix";
import { Key, type Color, type ComponentOpts } from "../api.js";
import { isHoverSlider } from "../behaviors/slider.js";
import type { IMGUI } from "../gui.js";
import { layoutBox } from "../layout.js";
import { tooltipRaw } from "./tooltip.js";

export interface RampOpts extends Omit<ComponentOpts, "label"> {
	ramp: Ramp<number>;
	/**
	 * User defined interpolation mode. Only used to compute internal hash of
	 * ramp curve geometry, i.e. if the {@link RampOpts.ramp} interpolation
	 * method changes, so should this mode value.
	 *
	 * @defaultValue 0
	 */
	mode?: number;
	/**
	 * Normalized snap/selection tolerance for ramp control point positions
	 *
	 * @defaultValue 0.05
	 */
	eps?: number;
	/**
	 * Ramp resolution (number of vertices for area plot)
	 *
	 * @defaultValue 100
	 */
	samples?: number;
	/**
	 * Optional fill color override (default: GUI text color)
	 */
	fill?: Color;
}

export const ramp = ({
	gui,
	layout,
	id,
	ramp,
	mode = 0,
	info,
	eps = 0.05,
	samples = 100,
	fill = gui.textColor(false),
}: RampOpts) => {
	const { x, y, w, h } = layoutBox(layout);
	const maxX = x + w;
	const maxY = y + h;
	const pos = [x, maxY];
	const maxPos = [maxX, y];
	const key = hash([x, y, w, h]);
	gui.registerID(id, key);
	const box = gui.resource(id, key, () => rect([x, y], [w, h]));
	const hover = isHoverSlider(gui, id, box, "move");
	const stops = ramp.stops;
	let selID = -1;
	let sel: Maybe<Vec>;
	let res: Maybe<Ramp<number>>;
	const focused = gui.requestFocus(id);
	if (hover) {
		sel = clamp01_2(null, fit2([], gui.mouse, pos, maxPos, ZERO2, ONE2));
		selID = ramp.closestIndex(sel[0], eps);
		if (gui.isMouseDown()) {
			gui.activeID = id;
			if (selID >= 0) {
				stops[selID] = <Frame<number>>sel;
			} else {
				ramp.setStopAt(
					roundTo(sel[0], 1e-3),
					roundTo(sel[1], 1e-3),
					eps
				);
			}
			res = ramp;
		}
		if (focused && selID >= 0 && __handleRampKeys(gui, ramp, selID)) {
			res = ramp;
		}
		info && gui.draw && tooltipRaw(gui, info);
	}
	if (gui.draw) {
		box.attribs = {
			fill: gui.bgColor(hover || focused),
			stroke: gui.focusColor(id),
		};
		gui.add(
			box,
			gui.resource(id, hash(stops.flatMap((x) => x)) + mode, () =>
				polygon(
					[
						[x, maxY],
						mix2([], pos, maxPos, [0, stops[0][1]]),
						...__rampVertices(ramp, pos, maxPos, samples),
						mix2([], pos, maxPos, [1, stops[stops.length - 1][1]]),
						[maxX, maxY],
					],
					{ fill }
				)
			),
			...stops.map(([t], i) => {
				const xx = mix(x, maxX, t);
				return triangle(
					[
						[xx - 5, maxY],
						[xx + 5, maxY],
						[xx, maxY - 5],
					],
					{ fill: gui.fgColor(selID === i) }
				);
			})
		);
		if (sel) {
			const [cx, cy] = mix2([], pos, maxPos, sel);
			gui.add(
				group({ stroke: gui.fgColor(selID >= 0) }, [
					line([x, cy], [maxX, cy]),
					line([cx, y], [cx, maxY]),
				])
			);
		}
	}
	gui.lastID = id;
	return res;
};

/** @internal */
const __rampVertices = (
	ramp: Ramp<number>,
	pos: Vec,
	maxPos: Vec,
	numSamples: number
) => map((p) => mix2(p, pos, maxPos, p), ramp.samples(numSamples));

/** @internal */
const __handleRampKeys = (gui: IMGUI, ramp: Ramp<number>, selID: number) => {
	switch (gui.key) {
		case Key.TAB:
			gui.switchFocus();
			break;
		case "x":
		case Key.DELETE:
			ramp.removeStopAtIndex(selID);
			return true;
		default:
	}
};
