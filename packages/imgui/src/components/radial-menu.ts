// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import {
	TESSELLATE_TRI_FAN,
	groupFromTessellation,
	tessellate,
	type Polygon,
} from "@thi.ng/geom";
import { centroid } from "@thi.ng/geom/centroid";
import { circle } from "@thi.ng/geom/circle";
import { mod } from "@thi.ng/math/prec";
import { mapIndexed } from "@thi.ng/transducers/map-indexed";
import { add2 } from "@thi.ng/vectors/add";
import { hash } from "@thi.ng/vectors/hash";
import { Key, type ComponentOpts, type Hash } from "../api.js";
import { buttonRaw } from "./button.js";
import { textLabelRaw } from "./textlabel.js";

export interface RadialMenuOpts
	extends Omit<ComponentOpts, "layout" | "label" | "info"> {
	x: number;
	y: number;
	r: number;
	items: string[];
	info?: string[];
}

export const radialMenu = ({
	gui,
	id,
	x,
	y,
	r,
	items,
	info,
}: RadialMenuOpts) => {
	const n = items.length;
	const key = hash([x, y, r, n, ~~gui.disabled]);
	gui.registerID(id, key);
	const cells: [Polygon, Hash, any, any][] = gui.resource(id, key, () => [
		...mapIndexed((i, cell) => {
			const p = add2(
				null,
				[-gui.textWidth(items[i]) >> 1, gui.theme.baseLine],
				centroid(cell)!
			);
			return [
				cell,
				hash(p),
				textLabelRaw(p, gui.textColor(false), items[i]),
				textLabelRaw(p, gui.textColor(true), items[i]),
			];
		}, groupFromTessellation(tessellate(circle([x, y], r, { __samples: n }), [TESSELLATE_TRI_FAN]))),
	]);
	let res: Maybe<number>;
	let sel = -1;
	for (let i = 0; i < n; i++) {
		const cell = cells[i];
		const _id = id + i;
		buttonRaw(gui, _id, cell[0], cell[1], cell[2], cell[3], info?.[i]) &&
			(res = i);
		gui.focusID === _id && (sel = i);
	}
	if (sel !== -1) {
		switch (gui.key) {
			case Key.UP:
			case Key.RIGHT:
				gui.focusID = id + mod(sel + 1, n);
				break;
			case Key.DOWN:
			case Key.LEFT:
				gui.focusID = id + mod(sel - 1, n);
			default:
		}
	}
	return res;
};
