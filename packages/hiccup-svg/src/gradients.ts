import { fattribs, fcolor, ff } from "./format.js";
import type { GradientStop, Vec2Like } from "./api.js";

const RE_ALPHA_COLOR =
	/(rgb|hsl)a\(([a-z0-9.-]+),([0-9.%]+),([0-9.%]+),([0-9.]+)\)/;

const gradient = (type: string, attribs: any, stops: GradientStop[]): any[] => [
	type,
	fattribs(attribs),
	...stops.map(gradientStop),
];

const gradientStop = ([offset, col]: GradientStop) => {
	col = fcolor(col);
	// use stop-opacity attrib for safari compatibility
	// https://stackoverflow.com/a/26220870/294515
	let opacity: string | undefined;
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
	attribs?: any
) =>
	gradient(
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
	attribs?: any
) =>
	gradient(
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
