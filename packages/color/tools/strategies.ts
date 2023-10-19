import {
	complementaryStrategy,
	lch,
	monochromeStrategy,
	splitComplementaryStrategy,
	squareStrategy,
	swatchesH,
	tetradicStrategy,
	triadicStrategy,
	variations,
} from "@thi.ng/color";
import { kebab } from "@thi.ng/strings";
import { writeSVG } from "./write.js";

const D = 0.025;

for (let strategy of [
	complementaryStrategy,
	splitComplementaryStrategy,
	triadicStrategy,
	tetradicStrategy,
	squareStrategy,
	monochromeStrategy,
]) {
	writeSVG(
		`export/strategies/${kebab(strategy.name)}.svg`,
		{ width: 500, height: 150, __convert: true },
		swatchesH([
			...variations(strategy(lch("#ff0")), {
				num: 100,
				delta: D,
			}),
		]),
		swatchesH(
			[
				...variations(strategy(lch("#0cc")), {
					num: 100,
					delta: D,
				}),
			],
			5,
			50,
			0,
			{ translate: [0, 50] }
		),
		swatchesH(
			[
				...variations(strategy(lch("#c0c")), {
					num: 100,
					delta: D,
				}),
			],
			5,
			50,
			0,
			{ translate: [0, 100] }
		)
	);
}
