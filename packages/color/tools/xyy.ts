import { oklab, xyy, xyzD50 } from "@thi.ng/color";
import { circle, setPrecision } from "@thi.ng/hiccup-svg";
import { map, normRange3d, push, transduce } from "@thi.ng/transducers";
import { madd2, mix3, type Vec } from "@thi.ng/vectors";
import { writeSVG } from "./write.js";

setPrecision(4);

const samples = transduce(
	map((x: Vec) => {
		x = mix3(null, [0.8, -2 / 3, -2 / 3, 1], [0.8, 2 / 3, 2 / 3, 1], x);
		const c = oklab(x);
		return circle(madd2(null, xyy(xyzD50(c)), [1, -1], [0, 1]), 0.005, {
			fill: c,
		});
	}),
	push(),
	normRange3d(1, 100, 100, false, false, false)
);

writeSVG(
	`export/xyy-oklab.svg`,
	{ width: 500, height: 500, viewBox: "-0.1 -0.4 1.2 1.4" },
	samples
);
