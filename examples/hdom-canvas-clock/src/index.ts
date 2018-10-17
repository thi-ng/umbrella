import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import { range } from "@thi.ng/transducers/iter/range";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { HALF_PI, TAU } from "@thi.ng/math/api";
import { toCartesian2 } from "@thi.ng/vectors/vec2";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const tick = (i: number, r1: number, r2: number) => {
    const theta = i / 12 * TAU - HALF_PI;
    return [
        ["line", {}, toCartesian2([r1, theta]), toCartesian2([r2, theta])],
        (i % 3) == 0 ?
            ["text", { stroke: "none" }, toCartesian2([r1 - 10, theta]), i > 0 ? i : 12] :
            null
    ];
};

const hand = (r1: number, r2: number, theta: number, attribs = {}, eps = 0.5) => {
    theta = theta * TAU - HALF_PI;
    return ["polygon", attribs,
        [[r1, theta - eps], [r2, theta], [r1, theta + eps]].map((p) => toCartesian2(p))];
};

const cancel = start(() => {
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
            //
            // shapes can be grouped using ["g"...] elements as in SVG
            // attribs declared at group level will be shared by all
            // children but can be overridden individually. groups can
            // be nested. also note, that nested `transform`,
            // `translate`, `rotate` and `scale` attribs are indeed
            // applied in a nested manner...
            //
            // see here for a list of all supported attribs:
            // https://github.com/thi-ng/umbrella/blob/master/packages/hdom-canvas/src/index.ts#L35
            ["g",
                {
                    translate: [100, 100],
                    stroke: "black", fill: "none",
                    align: "center", baseline: "middle",
                    __normalize: false
                },
                // rim
                ["circle", {}, [0, 0], 99],
                ["text", { font: "24px Menlo" }, [0, -33], "thi.ng"],
                // hour tick marks & weekday inset
                ["g", { fill: "black" },
                    ...mapcat((i) => tick(i, 90, 99), range(12)),
                    ["rect", { fill: "none" }, [40, -8], 30, 16],
                    ["text", { stroke: "none" }, [55, 0], WEEKDAYS[now.getDay()]]],
                // hands
                ["g", { fill: "black", stroke: "none" },
                    hand(5, 60, hour),
                    hand(5, 90, min),
                    hand(5, 80, sec, {
                        fill: "red",
                        shadowX: 2, shadowY: 2, shadowBlur: 5,
                        shadowColor: "rgba(0,0,0,0.4)"
                    }),
                    ["circle", {}, [0, 0], 5]]]],
        ["a.link",
            { href: "https://github.com/thi-ng/umbrella/tree/master/examples/hdom-canvas-clock" },
            "Source code"]];
});

const hot = (<any>module).hot;
if (hot) {
    hot.dispose(cancel);
}
