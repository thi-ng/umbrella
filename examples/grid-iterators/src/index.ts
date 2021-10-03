import { hueRgb } from "@thi.ng/color/rgb/hue-rgb";
import { srgbCss } from "@thi.ng/color/srgb/srgb-css";
import {
    diagonal2d,
    hilbert2d,
    interleaveColumns2d,
    interleaveRows2d,
    random2d,
    spiral2d,
    zcurve2d,
    zigzagColumns2d,
    zigzagDiagonal2d,
    zigzagRows2d,
} from "@thi.ng/grid-iterators";
import { createElement } from "@thi.ng/hdom/dom";
import { concat } from "@thi.ng/transducers/concat";
import { cycle } from "@thi.ng/transducers/cycle";

const W = 256;
const H = 256;
const canvas = <HTMLCanvasElement>(
    createElement(document.getElementById("app")!, "canvas", {
        width: W,
        height: H,
    })
);
const ctx = canvas.getContext("2d")!;

const NB: any = 16;
const BW = Math.ceil(W / NB);
const BH = Math.ceil(H / NB);
// create infinite sequence of all grid iterators
const buckets = cycle(
    concat(
        diagonal2d(NB, NB),
        zigzagRows2d(NB),
        hilbert2d(NB),
        zigzagColumns2d(NB),
        spiral2d(NB),
        zigzagDiagonal2d(NB),
        interleaveColumns2d(NB, NB, 4),
        interleaveRows2d(NB, NB, 4),
        zcurve2d(NB),
        random2d(NB)
    )
);

let frame = 0;
setInterval(() => {
    const b = buckets.next();
    let [x, y] = <number[]>b.value;
    x *= BW;
    y *= BH;
    ctx.fillStyle = srgbCss(hueRgb([], frame++ / (NB * NB)));
    ctx.fillRect(x, y, BW, BH);
}, 16);
