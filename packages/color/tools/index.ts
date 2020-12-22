import { asSvg, rect, svgDoc } from "@thi.ng/geom";
import { writeFileSync } from "fs";
import { cosineGradient, GRADIENTS } from "../src";

Object.keys(GRADIENTS).forEach((id) => {
    const fname = `export/gradient-${id}.svg`;
    console.log(fname);
    writeFileSync(
        fname,
        asSvg(
            svgDoc(
                {},
                ...cosineGradient(
                    100,
                    GRADIENTS[<keyof typeof GRADIENTS>id]
                ).map((col, i) => rect([i * 5, 0], [5, 50], { fill: col }))
            )
        )
    );
});
