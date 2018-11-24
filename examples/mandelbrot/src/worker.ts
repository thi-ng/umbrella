import { partial } from "@thi.ng/compose/partial";
import { fit01 } from "@thi.ng/math/fit";
import { cosineGradient } from "./gradient";

// see http://dev.thi.ng/gradients/

const gradients = [
    [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [-1.0, -1.0, -1.0], [0.00, 0.10, 0.20]],
    [[0.500, 0.500, 0.500], [0.500, 0.500, 0.500], [0.500, 0.618, 0.500], [-1.000, 0.828, -0.152]],
    [[0.402, 0.654, 0.247], [0.835, 0.668, 0.420], [1.226, 1.553, 1.445], [2.684, 6.256, 4.065]],
    [[0.500, 0.500, 0.500], [0.500, 0.500, 0.500], [0.500, 0.500, 0.500], [0.500, 0.500, 0.500]],
    [[0.5, 0.5, 0.5], [1.000, 1.000, 1.000], [10.000, 10.000, 10.000], [0.000, 0.000, 0.000]],
].map(partial(cosineGradient, 256));

// host message listener & responder
const $self: any = self;
self.addEventListener("message", (e) => {
    const pix = render(e.data);
    $self.postMessage(pix.buffer, [pix.buffer]);
});

// single pixel fractal evaluation
// see: https://en.wikipedia.org/wiki/Mandelbrot_set
const mandelbrot = (x0: number, y0: number, n: number) => {
    let x = 0;
    let y = 0;
    let i = 0;
    while (i < n && x * x + y * y < 4) {
        const t = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = t;
        i++;
    }
    return (i / n * 255) | 0;
};

// generates new fractal image based on given config tuple
const render = ({ x1, y1, x2, y2, iter, w, h, gradient }) => {
    const grad = gradients[gradient];
    const pix = new Uint32Array(w * h);
    for (let y = 0, i = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            // pix[i++] = splat8_24(mandelbrot(fit01(x / w, x1, x2), fit01(y / w, y1, y2), iter, k * x / w)) | 0xff000000;
            pix[i++] = grad[mandelbrot(fit01(x / w, x1, x2), fit01(y / w, y1, y2), iter)];
        }
    }
    return pix;
};
