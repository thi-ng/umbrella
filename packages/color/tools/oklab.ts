import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { map, normRange, push, transduce } from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { Color, lchLab, multiColorGradient, oklab, swatchesH } from "../src";

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

const gradient = multiColorGradient({
    num: 100,
    stops: [
        [0, lchLab([], [0.8, 0.2, 0])],
        [1 / 3, lchLab([], [0.8, 0.2, 1 / 3])],
        [1 / 2, lchLab([], [0.8, 0.2, 1 / 4])],
        [2 / 3, lchLab([], [0.8, 0.2, 2 / 3])],
        [1, lchLab([], [0.8, 0, 1])],
    ],
    tx: oklab,
});

writeFileSync(
    `export/oklab-multigradient2.svg`,
    serialize(
        svg(
            { width: 500, height: 50, convert: true },
            swatchesH(gradient, 5, 50)
        )
    )
);
