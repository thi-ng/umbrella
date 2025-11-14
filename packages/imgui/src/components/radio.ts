// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { isLayout } from "@thi.ng/layout/checks";
import { gridLayout } from "@thi.ng/layout/grid-layout";
import type { ComponentOpts } from "../api.js";
import { toggle } from "./toggle.js";

export interface RadioOpts extends Omit<ComponentOpts, "label" | "info"> {
	/**
	 * If true (default: false), the radio buttons will be arranged
	 * horizontally.
	 */
	horizontal?: boolean;
	/**
	 * If true (default: false), the radio buttons will be square and the labels
	 * positioned next to it.
	 */
	square?: boolean;
	/**
	 * Index of selected radio item
	 */
	value: number;
	/**
	 * Radio item labels
	 */
	label: string[];
	/**
	 * Radio item tooltips
	 */
	info?: string[];
}

export const radio = ({
	gui,
	layout,
	id,
	horizontal,
	square,
	value,
	label,
	info,
}: RadioOpts) => {
	const n = label.length;
	const nested = isLayout(layout)
		? horizontal
			? layout.nest(n, [n, 1])
			: layout.nest(1, [1, n])
		: horizontal
		? gridLayout(
				layout.x,
				layout.y,
				layout.w,
				n,
				layout.ch,
				layout.gapX,
				layout.gapY
		  )
		: gridLayout(
				layout.x,
				layout.y,
				layout.w,
				1,
				layout.ch,
				layout.gapX,
				layout.gapY
		  );
	let res: Maybe<number>;
	for (let i = 0; i < n; i++) {
		toggle({
			gui,
			square,
			layout: nested,
			id: `${id}-${i}`,
			value: value === i,
			label: label[i],
			info: info?.[i],
		}) !== undefined && (res = i);
	}
	return res;
};
