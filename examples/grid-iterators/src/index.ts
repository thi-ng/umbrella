import { hueRgba, rgbaCss } from "@thi.ng/color";
import { createElement } from "@thi.ng/hdom";
import { concat, cycle } from "@thi.ng/transducers";
import {
    diagonal2d,
    hilbert2d,
    random2d,
    spiral2d,
    zcurve2d,
    zigzagColumns2d,
    // zigzagDiagonal2d,
    zigzagRows2d
} from "@thi.ng/grid-iterators";

const W = 256;
const H = 256;
const canvas = <HTMLCanvasElement>(
    createElement(document.getElementById("app")!, "canvas", {
        width: W,
        height: H
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
        // zigzagDiagonal2d(NB),
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
    ctx.fillStyle = rgbaCss(hueRgba([], frame++ / (NB * NB)));
    ctx.fillRect(x, y, BW, BH);
}, 16);

// if (process.env.NODE_ENV !== "production") {
//     const hot = (<any>module).hot;
//     hot && hot.dispose(() => {});
// }
