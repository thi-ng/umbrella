import * as g from "@thi.ng/geom";
import { PI } from "@thi.ng/math";
import { XsAdd } from "@thi.ng/random";
import * as fs from "fs";
import * as lsys from "../src";

const impl = lsys.TURTLE_IMPL_2D;

try {
    fs.mkdirSync("export");
} catch (_) {}

fs.writeFileSync(
    `export/tree.svg`,
    g.asSvg(
        g.svgDoc(
            { stroke: "#00f", "stroke-width": 0.5, width: 600, height: 600 },
            ...lsys
                .interpret(
                    // create turtle instance with customized delta (rot angle)
                    lsys.turtle2d({
                        step: 20,
                        theta: -PI / 2,
                        delta: PI / 10,
                        jitter: 0.5,
                        decayDelta: 0.98,
                        decayStep: 0.85,
                        decayAlive: 0.975,
                        aliveProb: 0.999,
                        rnd: new XsAdd(0xdecafbad),
                    }),
                    // customize implementation to process syms "a" & "g" as "f"
                    { ...impl, a: impl.f, g: impl.f },
                    // recursively expand start rule "s"
                    lsys.expand(
                        {
                            s: "[f]",
                            f: "a[kp!>/-g]/a[kp!>/+g]",
                            g: "a[kp!>/+f]/a[kp!>/-f]",
                        },
                        "s",
                        13
                    )
                    //convert result paths to polylines for SVG export
                )
                .paths.map((pts) => g.polyline(pts))
        )
    )
);
