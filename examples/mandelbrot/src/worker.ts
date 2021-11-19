import { fit01 } from "@thi.ng/math/fit";
import { GRADIENTS } from "./gradient";

// host message listener & responder
const $self: any = self;
self.addEventListener("message", (e) => {
    console.log(e.data);
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
    return ((i / n) * 255) | 0;
};

// generates new fractal image based on given config tuple
const render = ({ x1, y1, x2, y2, iter, w, h, gradient }: any) => {
    const grad = GRADIENTS[gradient];
    const pix = new Uint32Array(w * h);
    for (let y = 0, i = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            // pix[i++] = splat8_24(mandelbrot(fit01(x / w, x1, x2), fit01(y / w, y1, y2), iter, k * x / w)) | 0xff000000;
            pix[i++] =
                grad[
                    mandelbrot(fit01(x / w, x1, x2), fit01(y / w, y1, y2), iter)
                ];
        }
    }
    return pix;
};
