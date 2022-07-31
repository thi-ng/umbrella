import {
	Color,
	lch,
	lchLab,
	multiColorGradient,
	oklab,
	swatchesH,
} from "@thi.ng/color";
import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { map, normRange, push, transduce } from "@thi.ng/transducers";
import { writeFileSync } from "fs";

for (let l of [0.5, 0.6, 0.7, 0.8, 0.9]) {
	const cols = transduce(
		map((t) => oklab(lchLab(null, [l, 0.2, t]))),
		push<Color>(),
		normRange(100, false)
	);

	writeFileSync(
		`export/oklab-${l.toFixed(1)}.svg`,
		serialize(
			svg(
				{ width: 500, height: 50, convert: true },
				swatchesH(cols, 5, 50)
			)
		)
	);
}

const L = 0.8;
const C = 0.8;

const gradient = multiColorGradient({
	num: 100,
	stops: [
		[0, lch(L, C, 0)],
		[1 / 3, lch(L, C, 1 / 3)],
		[2 / 3, lch(L, C, 2 / 3)],
		[1, lch(L, 0, 1)],
	],
	// easing: (t) => schlick(2, 0.5, t),
});

writeFileSync(
	`export/lch-multigradient3.svg`,
	serialize(
		svg(
			{ width: 500, height: 50, convert: true },
			swatchesH(gradient, 5, 50)
		)
	)
);
