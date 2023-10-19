import {
	COLOR_RANGES,
	COSINE_GRADIENTS,
	colorsFromRange,
	colorsFromTheme,
	cosineGradient,
	distCIEDE2000,
	lch,
	proximity,
	selectChannel,
	sort,
	swatchesH,
	type CSSColorName,
	type ColorRangePreset,
	type ColorThemePartTuple,
	type CosineGradientPreset,
	type ReadonlyColor,
} from "../src/index.js";
import { writeSVG } from "./write.js";

Object.keys(COSINE_GRADIENTS).forEach((id) => {
	const fname = `export/gradient-${id}-srgb.svg`;
	console.log(fname);
	writeSVG(
		fname,
		{ width: 500, height: 50, __convert: true },
		swatchesH(
			cosineGradient(100, COSINE_GRADIENTS[<CosineGradientPreset>id]),
			5,
			50
		)
	);
});

////////////////////////////////////////////////////////////

const V = 0.05;

const sorted = (cols: ReadonlyColor[]) =>
	sort(cols, proximity(lch("#fff"), distCIEDE2000()));

const sortedRange = (id: string, base: CSSColorName, num: number) =>
	sorted([
		...colorsFromRange(<ColorRangePreset>id, {
			variance: V,
			base,
			num,
		}),
	]);

for (let id in COLOR_RANGES) {
	writeSVG(
		`export/swatches-range-${id}-hue.svg`,
		{ width: 500, height: 50, __convert: true },
		swatchesH(
			sort(
				[
					...colorsFromRange(<ColorRangePreset>id, {
						num: 100,
						variance: V,
					}),
				],
				selectChannel(2)
			),
			5,
			50
		)
	);
	writeSVG(
		`export/swatches-range-${id}-chunks.svg`,
		{ width: 500, height: 50, __convert: true },
		swatchesH(
			[
				...sortedRange(id, "goldenrod", 22),
				...sortedRange(id, "turquoise", 22),
				...sortedRange(id, "pink", 22),
				...sortedRange(id, "black", 11),
				...sortedRange(id, "gray", 11),
				...sortedRange(id, "white", 11),
			],
			5,
			50
		)
	);
	writeSVG(
		`export/swatches-range-${id}-mixed.svg`,
		{ width: 500, height: 50, __convert: true },
		swatchesH(
			[
				...colorsFromTheme(
					[
						[<ColorRangePreset>id, "goldenrod", 22],
						[<ColorRangePreset>id, "turquoise", 22],
						[<ColorRangePreset>id, "pink", 22],
						[<ColorRangePreset>id, "black", 11],
						[<ColorRangePreset>id, "gray", 11],
						[<ColorRangePreset>id, "white", 11],
					],
					{ num: 100, variance: V }
				),
			],
			5,
			50
		)
	);
}

////////////////////////////////////////////////////////////

const theme: ColorThemePartTuple[] = [
	["cool", "goldenrod"],
	["hard", "hotpink", 0.1],
	["fresh", "springgreen", 0.1],
];

const colors = [...colorsFromTheme(theme, { num: 200, variance: 0.05 })];

writeSVG(
	"export/swatches-ex01.svg",
	{ width: 1000, height: 50, __convert: true },
	swatchesH(colors, 5, 50)
);

sorted(colors);

writeSVG(
	"export/swatches-ex02.svg",
	{ width: 1000, height: 50, __convert: true },
	swatchesH(colors, 5, 50)
);
