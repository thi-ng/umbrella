import { peek } from "@thi.ng/arrays/peek";
import type { IRamp } from "@thi.ng/ramp";
import { map } from "@thi.ng/transducers/map";

const tick = (x: number) => [
    "polygon",
    { translate: [x, 0], stroke: "black", fill: "#666" },
    [
        [-4, 3],
        [0, -2],
        [4, 3],
        [4, 9],
        [-4, 9],
    ],
];

export const rampViz = (ramp: IRamp, width: number, height: number) => {
    const cp = ramp.stops;
    return [
        "g",
        {},
        [
            "polygon",
            { fill: "$ramp", scale: [width, height] },
            [
                [0, 1],
                [0, 1 - cp[0][1]],
                ...map((p) => [p[0], 1 - p[1]], ramp.interpolatedPoints()),
                [1, 1 - peek(cp)[1]],
                [1, 1],
            ],
        ],
        [
            "g",
            { translate: [0, height] },
            ...ramp.stops.map((p) => tick(width * p[0])),
        ],
    ];
};
