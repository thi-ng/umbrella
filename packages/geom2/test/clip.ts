import { Mat23 } from "@thi.ng/vectors2/mat23";
import * as fs from "fs";
import * as g from "../src";

const a = g.polygon([[0, 0], [35, 0], [35, 60], [65, 60], [65, 0], [100, 0], [100, 100], [0, 100]], { stroke: "red" });
const b = g.polygon([[20, 25], [150, 80], [100, 150], [30, 110]], { stroke: "blue" });

fs.writeFileSync("clip-test.svg",
    g.asSvg(
        g.svgDoc({
            width: 600,
            height: 600,
            viewBox: "-10 -10 340 340",
            fill: "none",
            stroke: "black"
        },
            g.group(
                { transform: Mat23.translation(0, 0) },
                g.group({ "stroke-width": 5 }, ...g.union(a, b)),
                a, b
            ),
            g.group(
                { transform: Mat23.translation(160, 0) },
                g.group({ "stroke-width": 5 }, ...g.difference(a, b)),
                a, b
            ),
            g.group(
                { transform: Mat23.translation(0, 160) },
                g.group({ "stroke-width": 5 }, ...g.difference(b, a)),
                a, b
            ),
            g.group(
                { transform: Mat23.translation(160, 160) },
                g.group({ "stroke-width": 5 }, ...g.intersection(a, b)),
                a, b
            ),
        )
    )
);