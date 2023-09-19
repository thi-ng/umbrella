import {
	dotsH,
	invert,
	lch,
	oklab,
	rotate,
	type TypedColor,
} from "@thi.ng/color";
import { map, normRange } from "@thi.ng/transducers";
import { writeSVG } from "./write.js";

const src = [
	...map(
		(h) => <TypedColor<any>>rotate(null, lch(0.7, 0.8, 0), h),
		normRange(12, false)
	),
];
const src2 = src.map((x) => oklab(x));

writeSVG(
	`export/invert.svg`,
	{ width: 1000, height: 300, __convert: true },
	dotsH(src, 25, 0, { translate: [25, 25] }),
	dotsH(
		src.map((x) => invert(x.copy(), x)),
		25,
		0,
		{ translate: [25, 75] }
	),
	dotsH(src2, 25, 0, { translate: [25, 125] }),
	dotsH(
		src2.map((x) => invert(x.copy(), x)),
		25,
		0,
		{ translate: [25, 175] }
	)
);
