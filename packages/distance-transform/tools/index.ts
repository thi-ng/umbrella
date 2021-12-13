import {
    CHEBYSHEV,
    distanceTransform,
    EUCLEDIAN,
    MANHATTAN,
} from "@thi.ng/distance-transform";
import { floatBuffer, FLOAT_GRAY, GRAY8, intBuffer } from "@thi.ng/pixel";
import { asPGM } from "@thi.ng/pixel-io-netpbm";
import { drawLine } from "@thi.ng/rasterize";
import { writeFileSync } from "fs";

const W = 600;

const src = intBuffer(W, W, GRAY8);
drawLine(src, W / 5, (W * 4) / 5, W / 2, W / 5, 255);
drawLine(src, (W * 4) / 5, (W * 4) / 5, W / 2, W / 5, 255);
drawLine(src, W / 5, W / 2, (W * 4) / 5, W / 2, 255);

const all = floatBuffer(W * 3, W, FLOAT_GRAY);
[EUCLEDIAN, MANHATTAN, CHEBYSHEV].forEach((m, i) =>
    floatBuffer(W, W, FLOAT_GRAY, distanceTransform(src, m)).blit(all, {
        dx: i * W,
    })
);

all.forEach((x) => [x[0] ** 0.4545]);
writeFileSync("export/dt.pgm", asPGM(all.as(GRAY8)));
