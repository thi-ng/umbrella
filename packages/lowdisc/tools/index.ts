import { cosineGradient, COSINE_GRADIENTS } from "@thi.ng/color";
import { asSvg, circle, svgDoc } from "@thi.ng/geom";
import { setPrecision } from "@thi.ng/hiccup-svg";
import { Z4 } from "@thi.ng/strings";
import { mapIndexed, take } from "@thi.ng/transducers";
import { writeFileSync } from "fs";
import { plasticND } from "../src";

const W = 600;
const R = 0.005;
const NUM_COL = 256;

const grad = cosineGradient(NUM_COL, COSINE_GRADIENTS["blue-magenta-orange"]);

// hiccup-svg output precision
setPrecision(4);

for (let i = 100, j = 0; i < 5000; i += 100, j++) {
    writeFileSync(
        `export/ld-${Z4(j)}.svg`,
        asSvg(
            svgDoc(
                {
                    width: W,
                    height: W,
                    viewBox: "0 0 1 1",
                },
                ...mapIndexed(
                    (k, p: number[]) =>
                        circle(p, R, { fill: grad[k % NUM_COL] }),
                    take(i, plasticND(2))
                )
            )
        )
    );
}
