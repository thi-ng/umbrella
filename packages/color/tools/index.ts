import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { writeFileSync } from "fs";
import {
    ColorRangePreset,
    colorsFromRange,
    colorsFromTheme,
    ColorThemePartTuple,
    COLOR_RANGES,
    cosineGradient,
    CosineGradientPreset,
    COSINE_GRADIENTS,
    CSSColorName,
    distCIEDE2000,
    lch,
    proximity,
    ReadonlyColor,
    sort,
    swatchesH,
} from "../src";

Object.keys(COSINE_GRADIENTS).forEach((id) => {
    const fname = `export/gradient-${id}-srgb.svg`;
    console.log(fname);
    writeFileSync(
        fname,
        serialize(
            svg(
                { width: 500, height: 50, convert: true },
                swatchesH(
                    cosineGradient(
                        100,
                        COSINE_GRADIENTS[<CosineGradientPreset>id]
                    ),
                    5,
                    50
                )
            )
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
    writeFileSync(
        `export/swatches-range-${id}-chunks.svg`,
        serialize(
            svg(
                { width: 500, height: 50, convert: true },
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
            )
        )
    );
    writeFileSync(
        `export/swatches-range-${id}-mixed.svg`,
        serialize(
            svg(
                { width: 500, height: 50, convert: true },
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
            )
        )
    );
}

////////////////////////////////////////////////////////////

const theme = <ColorThemePartTuple[]>[
    ["cool", "goldenrod"],
    ["hard", "hotpink", 0.1],
    ["fresh", "springgreen", 0.1],
];

const colors = sorted([
    ...colorsFromTheme(theme, { num: 200, variance: 0.05 }),
]);

const doc = svg(
    { width: 1000, height: 50, convert: true },
    swatchesH(colors, 5, 50)
);

writeFileSync("export/swatches-ex01.svg", serialize(doc));
