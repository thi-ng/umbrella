import { polygon } from "@thi.ng/geom";
import { isolines, setBorder } from "@thi.ng/geom-isoline";
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import { TAU } from "@thi.ng/math";
import {
    comp,
    iterator,
    map,
    mapcat,
    mapIndexed,
    range,
    range2d,
} from "@thi.ng/transducers";
import type { Fn } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";

const W = 100;

const t0 = Date.now();

// pattern function
const plasma = (n: number, t: number) => {
    t = Math.sin(t * 0.005) * 100;
    const tmod = 123 + 4.5 * Math.sin(t * 0.02);
    return ([x, y]: number[]) => {
        x *= 0.1;
        y *= 0.1;
        let acc = 0;
        for (let i = 0; i < n; i++) {
            const p = (i * (TAU / n) * tmod) / 2;
            acc += Math.cos(TAU * (y * Math.cos(p) + x * Math.sin(p) + t));
        }
        return acc / 3;
    };
};

// compute full pattern via given fn
const makeField = (fn: Fn<number[], number>, width: number, height: number) =>
    setBorder([...map(fn, range2d(width, height))], width, height, 1000);

// hdom root component
const app = () => {
    const src = makeField(plasma(6, (Date.now() - t0) * 0.001), W, W);
    const contours = iterator(
        comp(
            mapIndexed((i, x) => <[number, Vec]>[x, [i / 20, 0, 1 - i / 20]]),
            mapcat(([i, col]) =>
                map((pts) => <[Vec[], Vec]>[pts, col], isolines(src, W, W, i))
            ),
            map(([pts, col]) => polygon(pts, { stroke: col }))
        ),
        range(-1, 1, 0.1)
    );
    return [
        canvas,
        { width: 600, height: 600 },
        ["g", { scale: 600 / W, weight: 0.05, __diff: false }, contours],
    ];
};

// kick off
const cancel = start(app);

// HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
