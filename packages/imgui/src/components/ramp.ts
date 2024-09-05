import type { Maybe } from "@thi.ng/api";
import { group } from "@thi.ng/geom/group";
import { line } from "@thi.ng/geom/line";
import { polygon } from "@thi.ng/geom/polygon";
import { rect } from "@thi.ng/geom/rect";
import { triangle } from "@thi.ng/geom/triangle";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { mix } from "@thi.ng/math/mix";
import { roundTo } from "@thi.ng/math/prec";
import type { Frame, Ramp } from "@thi.ng/ramp";
import { map } from "@thi.ng/transducers/map";
import { ONE2, ZERO2, type Vec } from "@thi.ng/vectors/api";
import { fit2 } from "@thi.ng/vectors/fit";
import { hash } from "@thi.ng/vectors/hash";
import { mix2 } from "@thi.ng/vectors/mix";
import { Key } from "../api.js";
import { isHoverSlider } from "../behaviors/slider.js";
import type { IMGUI } from "../gui.js";
import { layoutBox } from "../layout.js";
import { tooltipRaw } from "./tooltip.js";

export const ramp = (
	gui: IMGUI,
	layout: IGridLayout<any> | LayoutBox,
	id: string,
	ramp: Ramp<number>,
	rampMode = 0,
	info?: string
) => {
	let { x, y, w, h } = layoutBox(layout);
	const maxX = x + w;
	const maxY = y + h;
	const pos = [x, maxY];
	const maxPos = [maxX, y];
	const key = hash([x, y, w, h]);
	gui.registerID(id, key);
	const box = gui.resource(id, key, () => rect([x, y], [w, h]));
	const col = gui.textColor(false);
	const hover = isHoverSlider(gui, id, box, "move");
	const stops = ramp.stops;
	let selID = -1;
	let sel: Maybe<Vec>;
	let res: Maybe<Ramp<number>>;
	const focused = gui.requestFocus(id);
	if (hover) {
		sel = fit2([], gui.mouse, pos, maxPos, ZERO2, ONE2);
		selID = ramp.closestIndex(sel[0], 0.05);
		if (gui.isMouseDown()) {
			gui.activeID = id;
			if (selID >= 0) {
				stops[selID] = <Frame<number>>sel;
			} else {
				ramp.setStopAt(
					roundTo(sel[0], 1e-3),
					roundTo(sel[1], 1e-3),
					0.05
				);
			}
			res = ramp;
		}
		if (focused && selID >= 0 && handleRampKeys(gui, ramp, selID)) {
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
			gui.resource(id, hash(stops.flatMap((x) => x)) + rampMode, () =>
				polygon(
					[
						[x, maxY],
						mix2([], pos, maxPos, [0, stops[0][1]]),
						...rampVertices(ramp, pos, maxPos),
						mix2([], pos, maxPos, [1, stops[stops.length - 1][1]]),
						[maxX, maxY],
					],
					{ fill: col }
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

const rampVertices = (
	ramp: Ramp<number>,
	pos: Vec,
	maxPos: Vec,
	numSamples = 100
) => map((p) => mix2(p, pos, maxPos, p), ramp.samples(numSamples));

const handleRampKeys = (gui: IMGUI, ramp: Ramp<number>, selID: number) => {
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
