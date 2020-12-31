import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { writeFileSync } from "fs";
import {
    colorsFromTheme,
    ColorThemePartTuple,
    cosineGradient,
    CosineGradientPreset,
    GRADIENTS,
    hsvaRgba,
    swatchesH,
} from "../src";

Object.keys(GRADIENTS).forEach((id) => {
    const fname = `export/gradient-${id}.svg`;
    console.log(fname);
    writeFileSync(
        fname,
        serialize(
            svg(
                { width: 500, height: 50, convert: true },
                swatchesH(
                    cosineGradient(100, GRADIENTS[<CosineGradientPreset>id]),
                    5,
                    50
                )
            )
        )
    );
});

////////////////////////////////////////////////////////////

const theme = <ColorThemePartTuple[]>[
    ["cool", "goldenrod"],
    ["fresh", "hotpink", 0.1],
    ["light", "springgreen", 0.1],
];

const colors = [...colorsFromTheme(theme, { num: 200, variance: 0.05 })];

const doc = svg(
    { width: 1000, height: 50, convert: true },
    swatchesH(
        colors.map((x) => hsvaRgba([], x)),
        5,
        50
    )
);

writeFileSync("export/swatches-ex01.svg", serialize(doc));
