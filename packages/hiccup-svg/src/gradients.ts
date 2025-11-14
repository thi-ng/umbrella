// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { Attribs, GradientStop, Vec2Like } from "./api.js";
import { fattribs, fcolor, ff } from "./format.js";

const RE_ALPHA_COLOR =
	/(rgb|hsl)a\(([a-z0-9.-]+),([0-9.%]+),([0-9.%]+),([0-9.]+)\)/;

/** @internal */
const __gradient = (
	type: string,
	attribs: Attribs,
	stops: GradientStop[]
): any[] => [type, fattribs(attribs), ...stops.map(__gradientStop)];

/** @internal */
const __gradientStop = ([offset, col]: GradientStop) => {
	col = fcolor(col);
	// use stop-opacity attrib for safari compatibility
	// https://stackoverflow.com/a/26220870/294515
	let opacity: Maybe<string>;
	const parts = RE_ALPHA_COLOR.exec(col);
	if (parts) {
		col = `${parts[1]}(${parts[2]},${parts[3]},${parts[4]})`;
		opacity = parts[5];
	}
	return ["stop", { offset, "stop-color": col, "stop-opacity": opacity }];
};

export const linearGradient = (
	id: string,
	from: Vec2Like,
	to: Vec2Like,
	stops: GradientStop[],
	attribs?: Attribs
) =>
	__gradient(
		"linearGradient",
		{
			...attribs,
			id,
			x1: ff(from[0]),
			y1: ff(from[1]),
			x2: ff(to[0]),
			y2: ff(to[1]),
		},
		stops
	);

export const radialGradient = (
	id: string,
	from: Vec2Like,
	to: Vec2Like,
	fr: number,
	r: number,
	stops: GradientStop[],
	attribs?: Attribs
) =>
	__gradient(
		"radialGradient",
		{
			...attribs,
			id,
			fx: ff(from[0]),
			fy: ff(from[1]),
			cx: ff(to[0]),
			cy: ff(to[1]),
			fr: ff(fr),
			r: ff(r),
		},
		stops
	);
