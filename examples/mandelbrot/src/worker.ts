import { fit01 } from "@thi.ng/math/fit";
import { cosineGradient } from "./gradient";

const pallette = cosineGradient(
    256,
    [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [-1.0, -1.0, -1.0], [0.00, 0.10, 0.20]]
);

const $self: any = self;
self.addEventListener("message", (e) => {
    const pix = render(e.data);
    $self.postMessage(pix.buffer, [pix.buffer]);
});

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

const render = ({ x1, y1, x2, y2, n, w, h }) => {
    const pix = new Uint32Array(w * h);
    for (let y = 0, i = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            pix[i++] = pallette[mandelbrot(fit01(x / w, x1, x2), fit01(y / w, y1, y2), n)];
        }
    }
    return pix;
};
