import { canvas } from "@thi.ng/hdom-canvas";
import { memoize1 } from "@thi.ng/memoize";
import { CloseMode, sync, trigger } from "@thi.ng/rstream";
import {
    GestureEvent,
    GestureInfo,
    gestureStream,
} from "@thi.ng/rstream-gestures";
import { map, mapcat } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";

// memoized HOF component
// uses init lifecycle method to attach gesture stream
// to `main` stream...
const MTCanvas = memoize1((id: string) => {
    const _canvas = {
        ...canvas,
        init(el: HTMLElement) {
            main.add(gestureStream(el), el.id);
        },
    };
    return (attribs: any, gesture?: GestureEvent) => [
        _canvas,
        { id, class: "bg-washed-yellow", ...attribs },
        [
            "g",
            { fill: "red" },
            // visualize active gestures
            ...mapcat(
                (i: GestureInfo) => [
                    ["circle", { stroke: "#333", fill: "none" }, i.start, 20],
                    ["circle", {}, i.pos, 20 * (gesture?.zoom || 1)],
                    i.start
                        ? ["line", { stroke: "#333" }, i.start, i.pos]
                        : null,
                ],
                gesture?.active || []
            ),
        ],
    ];
});

// main stream w/ initial trigger input
const main = sync<any, any>({
    src: { temp: trigger() },
    closeIn: CloseMode.NEVER,
});

main.transform(
    map(({ main }) => [
        "div",
        ["h1", "Multitouch"],
        [
            "p",
            "Click/touch & drag in the yellow area below. Multiple cursors only supported via touch.",
        ],
        MTCanvas("main")({ width: 480, height: 360 }, main || {}),
        [
            "div",
            [
                "textarea.code.f7",
                { cols: 60, rows: 25 },
                JSON.stringify(main, null, 2),
            ],
        ],
    ]),
    updateDOM()
);
