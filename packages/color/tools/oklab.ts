import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { TAU } from "@thi.ng/math";
import { map, normRange, push, transduce } from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { Color, lchLab, oklab, swatchesH } from "../src";

for (let l of [0.5, 0.6, 0.7, 0.8, 0.9]) {
    const cols = transduce(
        map((t) => oklab(lchLab(null, [l, 0.2, t * TAU]))),
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
