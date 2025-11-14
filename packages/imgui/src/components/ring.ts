// SPDX-License-Identifier: Apache-2.0
import type { Fn, FnN2, Maybe } from "@thi.ng/api";
import { pointInRect } from "@thi.ng/geom-isec/point";
import { polygon } from "@thi.ng/geom/polygon";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { isLayout } from "@thi.ng/layout/checks";
import { HALF_PI, PI, TAU } from "@thi.ng/math/api";
import { fitClamped, norm } from "@thi.ng/math/fit";
import { clamp } from "@thi.ng/math/interval";
import { mix } from "@thi.ng/math/mix";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import type { Vec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { hash } from "@thi.ng/vectors/hash";
import type { ComponentOpts } from "../api.js";
import { dialVal } from "../behaviors/dial.js";
import { handleSlider1Keys } from "../behaviors/slider.js";
import type { IMGUI } from "../gui.js";
import { dialValueLabel } from "./textlabel.js";
import { tooltipRaw } from "./tooltip.js";

export interface RingOpts extends ComponentOpts {
	min: number;
	max: number;
	step: number;
	value: number;
	gap?: number;
	rscale?: number;
	fmt?: Fn<number, string>;
}

export const ring = ({
	gui,
	layout,
	id,
	min,
	max,
	step,
	value,
	gap = Math.PI,
	rscale = 0.5,
	label,
	info,
	fmt,
}: RingOpts) => {
	let h: number;
	let box: LayoutBox;
	if (isLayout(layout)) {
		h = __ringHeight(layout.cellW, gap);
		box = layout.next([1, layout.rowsForHeight(h) + 1]);
	} else {
		h = __ringHeight(layout.cw, gap);
		box = layout;
	}
	return ringRaw(
		gui,
		id,
		box.x,
		box.y,
		box.w,
		h,
		min,
		max,
		step,
		value,
		gap,
		rscale,
		0,
		h + box.ch / 2 + gui.theme.baseLine,
		label,
		fmt,
		info
	);
};

export interface RingGroupOpts
	extends Omit<RingOpts, "layout" | "value" | "label" | "info"> {
	layout: IGridLayout<any>;
	/**
	 * If true (default), the controls will be arranged horizontally.
	 */
	horizontal?: boolean;
	value: number[];
	label: string[];
	info?: string[];
}

export const ringGroup = (opts: RingGroupOpts) => {
	const { layout, id, value, label, info } = opts;
	const n = value.length;
	const nested =
		opts.horizontal !== false
			? layout.nest(n, [n, 1])
			: layout.nest(1, [
					1,
					(layout.rowsForHeight(
						__ringHeight(layout.cellW, opts.gap ?? Math.PI)
					) +
						1) *
						n,
			  ]);
	let res: Maybe<number>;
	let idx: number = -1;
	for (let i = 0; i < n; i++) {
		const v = ring({
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

export const ringRaw = (
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
	thetaGap: number,
	rscale: number,
	labelX: number,
	labelY: number,
	label?: string,
	fmt?: Fn<number, string>,
	info?: string
) => {
	const r = w / 2;
	const key = hash([x, y, r]);
	gui.registerID(id, key);
	const pos = [x + r, y + r];
	const startTheta = HALF_PI + thetaGap / 2;
	const endTheta = HALF_PI + TAU - thetaGap / 2;
	const draw = gui.draw;
	const aid = gui.activeID;
	const hover =
		!gui.disabled &&
		(aid === id || (aid === "" && pointInRect(gui.mouse, [x, y], [w, h])));
	let v: Maybe<number> = clamp(value, min, max);
	let res: Maybe<number>;
	if (hover) {
		gui.setCursor("pointer");
		gui.hotID = id;
		if (gui.isMouseDown()) {
			gui.activeID = id;
			res = dialVal(gui.mouse, pos, startTheta, thetaGap, min, max, step);
		}
		info && draw && tooltipRaw(gui, info);
	}
	const focused = gui.requestFocus(id);
	if (draw) {
		const valTheta = startTheta + (TAU - thetaGap) * norm(v, min, max);
		const r2 = r * rscale;
		// adaptive arc resolution
		const numV = fitClamped(r, 15, 80, 12, 30);
		const shape = (max: number) => () =>
			polygon(
				[
					...__arcVerts(pos, r, startTheta, max, numV),
					...__arcVerts(pos, r2, max, startTheta, numV),
				],
				{}
			);
		const bgShape = gui.resource(id, key, shape(endTheta));
		const valShape = gui.resource(id, v, shape(valTheta));
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
		valShape.attribs.fill = gui.fgColor(hover);
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

/** @internal */
const __ringHeight: FnN2 = (w, thetaGap) =>
	(w / 2) * (1 + Math.sin(HALF_PI + thetaGap / 2));

/** @internal */
const __arcVerts = (
	o: Vec,
	r: number,
	start: number,
	end: number,
	thetaRes = 12
): Iterable<Vec> =>
	r > 1
		? map(
				(t) => cartesian2(null, [r, mix(start, end, t)], o),
				normRange(
					Math.max(1, Math.abs(end - start) / (PI / thetaRes)) | 0
				)
		  )
		: [o];
