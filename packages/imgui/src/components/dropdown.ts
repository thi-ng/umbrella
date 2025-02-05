// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { polygon } from "@thi.ng/geom/polygon";
import { isLayout } from "@thi.ng/layout/checks";
import { gridLayout } from "@thi.ng/layout/grid-layout";
import { clamp0 } from "@thi.ng/math/interval";
import { hash } from "@thi.ng/vectors/hash";
import { Key, type ComponentOpts } from "../api.js";
import type { IMGUI } from "../gui.js";
import { buttonH } from "./button.js";

export interface DropDownOpts extends Omit<ComponentOpts, "label"> {
	/**
	 * Index of selected item.
	 */
	value: number;
	items: string[];
	label: string;
}

export const dropdown = ({
	gui,
	layout,
	id,
	value,
	items,
	label,
	info,
}: DropDownOpts) => {
	const open = gui.state<boolean>(id, () => false);
	const nested = isLayout(layout)
		? layout.nest(1, [1, open ? items.length : 1])
		: gridLayout(layout.x, layout.y, layout.w, 1, layout.ch, layout.gap);
	let res: Maybe<number>;
	const box = nested.next();
	const { x, y, w, h } = box;
	const key = hash([x, y, w, h, ~~gui.disabled]);
	const tx = x + w - gui.theme.pad - 4;
	const ty = y + h / 2;
	const draw = gui.draw;
	if (open) {
		const bt = buttonH({
			gui,
			layout: box,
			id: `${id}-title`,
			label,
			info,
		});
		draw &&
			gui.add(
				gui.resource(id, key + 1, () => __triangle(gui, tx, ty, true))
			);
		if (bt) {
			gui.setState(id, false);
		} else {
			for (let i = 0, n = items.length; i < n; i++) {
				if (
					buttonH({
						gui,
						layout: nested,
						id: `${id}-${i}`,
						label: items[i],
					})
				) {
					i !== value && (res = i);
					gui.setState(id, false);
				}
			}
			if (gui.focusID.startsWith(`${id}-`)) {
				switch (gui.key) {
					case Key.ESC:
						gui.setState(id, false);
						break;
					case Key.UP:
						return __update(gui, id, clamp0(value - 1));
					case Key.DOWN:
						return __update(
							gui,
							id,
							Math.min(items.length - 1, value + 1)
						);
					default:
				}
			}
		}
	} else {
		if (
			buttonH({
				gui,
				layout: box,
				id: `${id}-${value}`,
				label: items[value] ?? label,
				labelHover: label,
				info,
			})
		) {
			gui.setState(id, true);
		}
		draw &&
			gui.add(
				gui.resource(id, key + 2, () => __triangle(gui, tx, ty, false))
			);
	}
	return res;
};

/** @internal */
const __update = (gui: IMGUI, id: string, next: number) => {
	gui.focusID = `${id}-${next}`;
	return next;
};

/** @internal */
const __triangle = (gui: IMGUI, x: number, y: number, open: boolean) => {
	const s = open ? 2 : -2;
	return polygon(
		[
			[x - 4, y + s],
			[x + 4, y + s],
			[x, y - s],
		],
		{
			fill: gui.textColor(false),
		}
	);
};
