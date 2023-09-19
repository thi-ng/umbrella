import { asSvg, circle, group, line, polygon, svgDoc } from "@thi.ng/geom";
import { setPrecision } from "@thi.ng/hiccup-svg";
import { TAU } from "@thi.ng/math";
import { map, mapcat, normRange } from "@thi.ng/transducers";
import { cartesian2 } from "@thi.ng/vectors";
import { writeFileSync } from "fs";
import { lch, maxChroma, maxLumaChroma, srgb, type LCH } from "../src/index.js";

const R = 200;
setPrecision(3);

const rgbCols = [
	[1, 0, 0],
	[1, 1 / 3, 0],
	[1, 0.5, 0],
	[1, 2 / 3, 0],
	[1, 1, 0],
	[2 / 3, 1, 0],
	[0.5, 1, 0],
	[1 / 3, 1, 0],
	[0, 1, 0],
	[0, 1, 1 / 3],
	[0, 1, 0.5],
	[0, 1, 2 / 3],
	[0, 1, 1],
	[0, 2 / 3, 1],
	[0, 0.5, 1],
	[0, 1 / 3, 1],
	[0, 0, 1],
	[1 / 3, 0, 1],
	[0.5, 0, 1],
	[2 / 3, 0, 1],
	[1, 0, 1],
	[1, 0, 2 / 3],
	[1, 0, 0.5],
	[1, 0, 1 / 3],
];

const pts = rgbCols
	.map((x) => lch(srgb(x)))
	.map((col) => {
		const h = col.h * TAU;
		const a = cartesian2(null, [R, h]);
		const b = cartesian2(null, [col.c * R, h]);
		const c = cartesian2(null, [col.l * R, h]);
		return [col, a, b, c];
	});

const dots = pts.map(([col, a, b, c]) => {
	const col2 = (<LCH>col).copy();
	col2.c = 1;
	const col3 = (<LCH>col).copy();
	col3.l = 0.99;
	col3.c = maxChroma(col[0], col[2]);
	return group({ fill: col, stroke: col }, [
		line(a, b),
		line(b, c),
		circle(a, 10, { fill: col3 }),
		circle(b, 5),
		circle(c, 5),
	]);
});

writeFileSync(
	"export/lch-hues.svg",
	asSvg(
		svgDoc(
			{},
			group({ stroke: "#ccc" }, [
				circle(2, { fill: "#000" }),
				circle(R),
				circle(R * lch.range[1][1]),
				...map(
					(t) => line([0, 0], cartesian2([], [R, t * TAU])),
					normRange(18, false)
				),
			]),
			polygon(pts.map((x) => x[2])),
			polygon(pts.map((x) => x[3])),
			...dots
		)
	)
);

writeFileSync(
	"export/lch-max-chroma.svg",
	asSvg(
		svgDoc(
			{
				viewBox: `${-R * 1.4} ${-R * 1.4} ${R * 2.8} ${R * 2.8}`,
				"font-size": "9px",
			},
			circle(R, { stroke: "#ccc" }),
			...map(
				(col: LCH) => {
					// const col = lchMaxChroma(l, h);
					const pos = cartesian2(null, [col.c * R, col.h * TAU]);
					return circle(pos, 5, {
						fill: col,
					});
				},
				mapcat<number, LCH>(
					(h) => {
						const col = maxLumaChroma(h);
						// const { l: L, c: c } = maxLumaChroma(h);
						return map(
							(l) => lch(l * col.l, l * col.c, h),
							normRange((col.c * 10) | 0)
						);
						// return [lchMaxForHue(h)];
					},
					normRange(200, false)
					// range(0, 1.01, 0.01)
					// range(0.22, 0.33, 0.01)
				)
			)
		)
	)
);
