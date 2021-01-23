import { serialize } from "@thi.ng/hiccup";
import { svg } from "@thi.ng/hiccup-svg";
import { TAU } from "@thi.ng/math";
import { map, normRange, push, transduce } from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { lchLab, oklab, Oklab, swatchesH } from "../src";

const cols = transduce(
    map((t) => oklab(lchLab(null, [0.9, 0.12, t * TAU]))),
    push<Oklab>(),
    normRange(100, false)
);

writeFileSync(
    "export/oklab.svg",
    serialize(
        svg({ width: 500, height: 50, convert: true }, swatchesH(cols, 5, 50))
    )
);
