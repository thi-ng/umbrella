import { closestPointEllipse } from "@thi.ng/geom-closest-point/ellipse";
import { $canvas } from "@thi.ng/rdom-canvas";
import { $compile } from "@thi.ng/rdom/compile";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { merge } from "@thi.ng/rstream/merge";
import { reactive } from "@thi.ng/rstream/stream";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { repeatedly } from "@thi.ng/transducers/repeatedly";
import { add2 } from "@thi.ng/vectors/add";
import { normalCCW } from "@thi.ng/vectors/normal";
import { random2 } from "@thi.ng/vectors/random";

const W = 600;

// define random ellipses ([origin, radius] tuples)
const ELLIPSES = [
    ...repeatedly(() => [random2([], 50, W - 50), random2([], 10, W / 2)], 5),
];

// compile & mount reactive canvas component
$compile(
    $canvas(
        // stream merge
        merge<any, any>({
            src: [
                // #1 initial call to action...
                reactive([
                    "g",
                    {},
                    [
                        "text",
                        { align: "center", fill: "black" },
                        [W / 2, W / 2],
                        "Move your mouse / finger!",
                    ],
                ]),
                // #2 stream of mouse/touch coordinates (main)
                gestureStream(document.body).map((e) => [
                    "g",
                    // disable canvas clearing if no mouse buttons pressed
                    { fill: "none", __clear: !!e.buttons },
                    // semi-transparent white rect to fade previous frame
                    ["rect", { fill: [1, 1, 1, 0.2] }, [0, 0], W, W],
                    // declare ellipses, closest points and tangents
                    ...mapcat(([o, r]) => {
                        const p = closestPointEllipse(e.pos, o, r);
                        return [
                            ["ellipse", { stroke: "#ccc" }, o, r],
                            ["circle", { stroke: "#f0f" }, p, 5],
                            ["line", { stroke: "#666" }, e.pos, p],
                            [
                                "line",
                                { stroke: "#6c0" },
                                p,
                                add2(null, normalCCW([], p, e.pos, 100), p),
                            ],
                        ];
                    }, ELLIPSES),
                ]),
            ],
        }),
        [W, W]
    )
).mount(document.getElementById("app")!);
