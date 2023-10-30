import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { isLayout } from "@thi.ng/layout/checks";
import { gridLayout } from "@thi.ng/layout/grid-layout";
import type { IMGUI } from "../gui.js";
import { toggle } from "./toggle.js";

export const radio = (
	gui: IMGUI,
	layout: IGridLayout<any> | LayoutBox,
	id: string,
	horizontal: boolean,
	sel: number,
	square: boolean,
	labels: string[],
	info: string[] = []
) => {
	const n = labels.length;
	const nested = isLayout(layout)
		? horizontal
			? layout.nest(n, [n, 1])
			: layout.nest(1, [1, n])
		: horizontal
		? gridLayout(layout.x, layout.y, layout.w, n, layout.ch, layout.gap)
		: gridLayout(layout.x, layout.y, layout.w, 1, layout.ch, layout.gap);
	let res: number | undefined;
	for (let i = 0; i < n; i++) {
		toggle(
			gui,
			nested,
			`${id}-${i}`,
			sel === i,
			square,
			labels[i],
			info[i]
		) !== undefined && (res = i);
	}
	return res;
};
