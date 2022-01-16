import { peek } from "@thi.ng/arrays";
import {
    comp,
    filter,
    map,
    normRange,
    partitionBy,
    push,
    range2d,
    transduce,
} from "@thi.ng/transducers";
import { isRgbGamut, lch } from "../src/index.js";

const chroma = (h: number) =>
    transduce(
        comp(
            map(([c, l]) => ({
                c,
                l,
                valid: isRgbGamut(lch(l, c, h)),
            })),
            filter((x) => x.valid),
            partitionBy((x) => x.l),
            map((x) => peek(x).c),
            map((x) => (x * 100) | 0)
        ),
        push(),
        range2d(0, 1.5, 0, 1.0, 0.01, 0.04)
    );

// hue resolution: 48
console.log([...map(chroma, normRange(48, false))]);
