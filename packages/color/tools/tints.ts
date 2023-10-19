import { dotsV, lch, tint, tone, ycc, type LCH } from "@thi.ng/color";
import { circle } from "@thi.ng/geom";
import { PI } from "@thi.ng/math";
import { map, normRange, range2d } from "@thi.ng/transducers";
import { fit2, type Vec } from "@thi.ng/vectors";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { writeSVG } from "./write.js";

const src = [...map((h) => lch(0.6, 1, h), normRange(12, false))];

writeSVG(
	`export/shades.svg`,
	{ width: 400, height: 400, __convert: true },
	...map(
		(t) =>
			dotsV(
				src.map((x) => tone(lch(), x, t)),
				12,
				0,
				{ translate: [(0.5 + t * 10) * 24, 12] }
			),
		normRange(10)
	)
);

const widget = (col: LCH, tx: Vec, r = 8, r2 = r * 3, r3 = r * 6) => [
	"g",
	{ translate: tx },
	circle([0, 0], r, { fill: col }),
	circle(cartesian2([], [r2, -PI / 3]), r, {
		fill: tint(lch(), col, 0.5, 1),
	}),
	circle(cartesian2([], [r2, 0]), r, { fill: tint(lch(), col, 0.5, 0.5) }),
	circle(cartesian2([], [r2, PI / 3]), r, { fill: tint(lch(), col, 0.5, 0) }),
	circle(cartesian2([], [r3, -PI / 6]), r, {
		fill: tint(lch(), col, 0.9, 1),
	}),
	circle(cartesian2([], [r3, 0]), r, { fill: tint(lch(), col, 0.9, 0.5) }),
	circle(cartesian2([], [r3, PI / 6]), r, {
		fill: tint(lch(), col, 0.9, 0),
	}),
];

const Y = 0.05;

writeSVG(
	`export/shades2.svg`,
	{ width: 800, height: 800, stroke: "#ccc", __convert: true },
	...map(
		([x, y]) =>
			widget(
				lch(ycc(Y, x, y)),
				fit2(
					null,
					[x, y],
					[-0.5, -0.5],
					[0.5, 0.5],
					[20, 40],
					[740, 740]
				)
			),
		range2d(-0.5, 0.51, -0.5, 0.51, 0.125, 0.125)
	)
);
