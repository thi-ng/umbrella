import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import { range } from "@thi.ng/transducers/iter/range";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { HALF_PI, TAU } from "@thi.ng/vectors/math";
import { toCartesian2 } from "@thi.ng/vectors/vec2";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const tick = (i: number, r1: number, r2: number, color: string) => {
    const theta = i / 12 * TAU - HALF_PI;
    return [
        ["polyline", { stroke: color }, [toCartesian2([r1, theta]), toCartesian2([r2, theta])]],
        (i % 3) == 0 ?
            ["text", { fill: color, align: "center", baseLine: "middle" },
                toCartesian2([r1 - 10, theta]), i > 0 ? i : 12] :
            []
    ];
};

const hand = (r1: number, r2: number, theta: number, fill: string, eps = 0.5) => {
    theta = theta * TAU - HALF_PI;
    return ["polygon", { fill },
        [[r1, theta - eps], [r2, theta], [r1, theta + eps]].map((p) => toCartesian2(p))];
};

start(() => {
    const now = new Date();
    const t = now.getTime() / 1000 - now.getTimezoneOffset() * 60;
    const sec = (t % 60) / 60;
    const min = ((t % 3600) + sec / 60) / 3600;
    const hour = ((t % (12 * 3600)) + min / 60) / (12 * 3600);
    return ["div.vh-100.flex.flex-column.justify-center.items-center.code.f7",
        ["div", now.toLocaleTimeString()],
        [canvas, { class: "ma2", width: 200, height: 200 },
            // these canvas-inner elements use SVG-like hiccup syntax,
            // but are NOT real DOM elements. they will be processed by
            // the canvas component's branch-local hdom update
            // operations and translated into canvas drawing commands
            ["g", { transform: [1, 0, 0, 1, 100, 100] },
                // rim
                ["circle", { stroke: "black" }, [0, 0], 99],
                // hour tick marks
                ...mapcat((i) => tick(i, 90, 99, "black"), range(12)),
                // weekday inset
                ["rect", { stroke: "black" }, [40, -8], 30, 16],
                ["text", { fill: "black" }, [55, 0], WEEKDAYS[now.getDay()]],
                // hands
                hand(5, 80, sec, "red"),
                hand(5, 90, min, "black"),
                hand(5, 60, hour, "black"),
                ["circle", { fill: "black" }, [0, 0], 5]
            ]],
        ["a.link",
            { href: "https://github.com/thi-ng/umbrella/tree/feature/hdom-canvas/examples/hdom-canvas-clock" },
            "Source code"]];
});

// const hot = (<any>module).hot;
// if (hot) {
//     hot.dispose(() => {
//         cancel();
//     });
// }
