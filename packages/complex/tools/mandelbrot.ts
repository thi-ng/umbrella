import { abs, add, Complex, mul } from "@thi.ng/complex";
import { canvas, formatCanvas, SHADES_ASCII_16 } from "@thi.ng/text-canvas";
import { map, range2d, run } from "@thi.ng/transducers";
import { fit2 } from "@thi.ng/vectors";

const mandelbrot = (pos: Complex, escapeRadius: number, maxIter: number) => {
    let i = 0;
    let z: Complex = pos;
    while (++i < maxIter && abs(z) < escapeRadius) {
        z = add(mul(z, z), pos);
    }
    return maxIter - i;
};

const canv = canvas(120, 60);
const maxSize: [number, number] = [canv.width, canv.height];

run(
    map((p) => {
        canv.setAt(
            p[0],
            p[1],
            SHADES_ASCII_16[
                mandelbrot(
                    fit2([], p, [0, 0], maxSize, [-2, -1.25], [0.65, 1.25]),
                    2000,
                    15
                )
            ].charCodeAt(0)
        );
    }),
    range2d(...maxSize)
);

console.log(formatCanvas(canv));
