import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { writeFileSync } from "fs";
import {
    ColorRangePreset,
    colorsFromTheme,
    ColorThemePartTuple,
    COLOR_RANGES,
    cosineGradient,
    CosineGradientPreset,
    COSINE_GRADIENTS,
    proximityHSV,
    selectChannel,
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

for (let id in COLOR_RANGES) {
    writeFileSync(
        `export/swatches-green-${id}.svg`,
        serialize(
            svg(
                { width: 500, height: 50, convert: true },
                swatchesH(
                    sort(
                        [
                            ...colorsFromTheme(
                                [
                                    [<ColorRangePreset>id, "goldenrod"],
                                    [<ColorRangePreset>id, "turquoise"],
                                ],
                                {
                                    num: 100,
                                    variance: 0.05,
                                }
                            ),
                        ],
                        proximityHSV([0, 1, 1])
                    ),
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
    ["fresh", "hotpink", 0.1],
    ["light", "springgreen", 0.1],
];

const colors = [...colorsFromTheme(theme, { num: 200, variance: 0.05 })];

sort(colors, selectChannel(0), true);

const doc = svg(
    { width: 1000, height: 50, convert: true },
    swatchesH(colors, 5, 50)
);

writeFileSync("export/swatches-ex01.svg", serialize(doc));
