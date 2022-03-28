import { abs, add, Complex, mul } from "@thi.ng/complex";
import { canvas, formatCanvas, SHADES_ASCII_16 } from "@thi.ng/text-canvas";
import { map, range2d, run } from "@thi.ng/transducers";
import { fit2 } from "@thi.ng/vectors";

// mandelbrot evaluation
const mandelbrot = (pos: Complex, escapeRadius: number, maxIter: number) => {
    let i = 0;
    let z: Complex = pos;
    while (++i < maxIter && abs(z) < escapeRadius) {
        z = add(mul(z, z), pos);
    }
    return maxIter - i;
};

// text canvas setup
const canv = canvas(120, 60);
const maxSize: [number, number] = [canv.width, canv.height];

// evaluate for all pixels and visualize as ASCII art
run(
    map((p) => {
        canv.setAt(
            p[0],
            p[1],
            SHADES_ASCII_16[
                mandelbrot(
                    // map pixel pos to mandelbrot region
                    fit2([], p, [0, 0], maxSize, [-2, -1.25], [0.65, 1.25]),
                    2000,
                    15
                )
            ]
        );
    }),
    range2d(...maxSize)
);

// output canvas as string
console.log(formatCanvas(canv));
