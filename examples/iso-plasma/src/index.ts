import { Fn } from "@thi.ng/api";
import { polygon } from "@thi.ng/geom";
import { isolines, setBorder } from "@thi.ng/geom-isoline";
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import { fit, TAU } from "@thi.ng/math";
import {
    comp,
    iterator,
    map,
    mapcat,
    range,
    range2d,
    mapIndexed
} from "@thi.ng/transducers";
import { Vec } from "@thi.ng/vectors";

const t0 = Date.now();

const fn = (n, t) => {
    t = Math.sin(t * 0.005) * 100;
    const tmod = 123 + 4.5 * Math.sin(t * 0.02);
    return ([x, y]) => {
        x *= 0.1;
        y *= 0.1;
        let acc = 0;
        for (let i = 0; i < n; i++) {
            const p = i * (TAU / n) * tmod / 2;
            acc += Math.cos(TAU * (y * Math.cos(p) + x * Math.sin(p) + t));
        }
        return acc / 3;
    };
};

const makeField = (fn: Fn<number[], number>, width, height) =>
    setBorder(
        [...map(fn, range2d(width, height))],
        width,
        height,
        1000
    );

const cancel = start(() => {
    const src = makeField(fn(6, (Date.now() - t0) * 0.001), 100, 100);
    const contours = iterator(
        comp(
            mapIndexed((i, x) => [x, [i / 20, 0, 1 - i / 20]]),
            mapcat(([i, col]) => map((pts) => [pts, col], isolines(src, 100, 100, <number>i))),
            map(([pts, col]: [Vec[], Vec]) => polygon(pts, { stroke: col }))
        ),
        range(-1, 1, 0.1)
    );
    return [canvas, { width: 600, height: 600 },
        ["g", { scale: 6, weight: 0.05, stroke: "#000" }, contours]
    ];
});

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
