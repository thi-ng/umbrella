import { group, line, rect, svg, text } from "@thi.ng/hiccup-svg";
import { fit, fit01 } from "@thi.ng/math";
import { map, mapcat, mapIndexed, range } from "@thi.ng/transducers";

// iterator of range mapped tuples: `[mapped, orig]`
const mappedRange = (
	from: number,
	to: number,
	step: number,
	start: number,
	end: number
) => map((n) => [fit(n, from, to, start, end), n], range(from, to, step));

const mappedTicks = (start: number, end: number, ticks: any[]) =>
	mapIndexed((i, x) => [fit01(i / ticks.length, start, end), x], 0, ticks);

// reusuable axis tick & label combo
export const tick = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	tx: number,
	ty: number,
	label: any
) => [line([x1, y1], [x2, y2]), text([tx, ty], label, { stroke: "none" })];

// mapping fn for x-axis ticks
const tickX =
	(y: number) =>
	([x, n]: [number, any]) =>
		tick(x, y, x, y + 10, x, y + 20, n);

// mapping fn for y-axis ticks
const tickY =
	(x: number) =>
	([y, n]: [number, any]) =>
		tick(x - 10, y, x, y, x - 15, y, n);

export const labeledTickX =
	(y: number) =>
	([x, n]: any[]) =>
		[
			line([x, y], [x, y + 5]),
			text([x, y + 15], n, {
				stroke: "none",
				"text-anchor": "end",
				transform: `rotate(-45 ${x} ${y + 15})`,
			}),
		];

export const labeledTickY =
	(width: number, fmt = (x: number) => String(x)) =>
	(x: number) =>
	([y, n]: [number, any]) =>
		[
			...tick(x - 5, y, x, y, x - 10, y + 4, n > 0 ? fmt(n) : 0),
			n > 0
				? line([x + 20, y], [width, y], { "stroke-dasharray": "1 3" })
				: null,
		];

// x-axis with ticks as SVG group
export const axisX = ({ axis: a, domain: d, range: r, label, ticks }: any) => [
	"g",
	{ "text-anchor": "middle" },
	line([a[0], a[2]], [a[1], a[2]]),
	mapcat(
		(label || tickX)(a[2]),
		ticks
			? mappedTicks(r[0], r[1], ticks)
			: mappedRange(d[0], d[1], d[2], r[0], r[1])
	),
];

// y-axis with ticks as SVG group
export const axisY = ({ axis: a, domain: d, range: r, label, ticks }: any) => [
	"g",
	{ "text-anchor": "end" },
	line([a[2], a[0]], [a[2], a[1]]),
	mapcat(
		(label || tickY)(a[2]),
		ticks
			? mappedTicks(r[0], r[1], ticks)
			: mappedRange(d[0], d[1], d[2], r[0], r[1])
	),
];

// mapping fn to create a single bar from `[domainPos, value]`
const bar =
	({ domain: xd, range: xr }: any, { domain: yd, range: yr }: any) =>
	([xx, yy]: any) => {
		const y = fit(yy, yd[0], yd[1], yr[0], yr[1]);
		return rect(
			[fit(xx, xd[0], xd[1], xr[0], xr[1]) - 5, y],
			10,
			yr[0] - y
		);
	};

// complete bar chart component
export const barChart = (_: any, opts: any, values: any, ...xs: any) =>
	svg(
		opts.attribs,
		group(
			{ stroke: opts.axis, fill: opts.axis },
			axisX(opts.x),
			axisY(opts.y)
		),
		group({ fill: opts.fill }, map(bar(opts.x, opts.y), values)),
		...xs
	);
