import { canvas } from "@thi.ng/hdom-canvas";
import { HALF_PI, PI } from "@thi.ng/math";
import { CloseMode, StreamSync, sync, trigger } from "@thi.ng/rstream";
import { GestureEvent, gestureStream } from "@thi.ng/rstream-gestures";
import {
    filter,
    map,
    mapcat,
    normRange,
    partition,
    repeat,
    zip,
} from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { dist } from "@thi.ng/vectors";

// canvas size
const W = 480;

// higher order line/shape component function
// takes a tuple of 2 points and returns a component fn
const line = ([a, b]: number[][]) => (_: any, attribs: any) => [
    "line",
    { ...attribs, weight: dist(a, b) / 4 },
    a,
    b,
];

// higher order root component function. takes a @thi.ng/rstream
// `StreamSync` instance as argument to dynamically add a new input
// stream to later
const app = (main: StreamSync<any, any>) => {
    // augment hdom-canvas component w/ `init` lifecycle method: this is
    // method is called when the canvas DOM element is first created and
    // used to attach a mouse & touch event stream to it. this stream is
    // then transformed using a number of transducers and eventually
    // outputs a series of `line` components. furthermore this
    // transformed stream is added as new input to the `main` stream
    // combinator below...
    const _canvas = {
        ...canvas,
        init: (el: HTMLCanvasElement) =>
            main.add(
                gestureStream(el).transform(
                    // only interested in some gesture types
                    filter(
                        (e: GestureEvent) =>
                            e.type === "start" || e.type === "drag"
                    ),
                    // get current mouse / touch position
                    map((e) => e.pos),
                    // form consecutive line pairs
                    partition(2, 1),
                    // transform into pre-curried line component
                    map(line)
                ),
                // name of the new input
                "gesture"
            ),
    };
    // this root component function will produce the actual UI and
    // will be attached to the `main` stream combinator below and executes
    // each time any inputs have changed...
    // the only input used here is the above stream of mouse events
    // transformed into line components
    return ({ gesture }: any) => [
        "div.sans-serif.ma2",
        "Click & draw in the box below...",
        // all child elements of the canvas component
        // are NOT real DOM elements, but are translated into
        // canvas API draw calls
        [
            _canvas,
            { class: "mv2 db", width: W, height: W, __clear: false },
            // semi-transparent bg
            [
                "rect",
                {
                    fill: "rgba(255,255,255,0.1)",
                    stroke: "black",
                    dash: [1, 1],
                },
                [0, 0],
                W,
                W,
            ],
            // use a group node to assign attributes common to all children
            [
                "g",
                { lineCap: "round" },
                // `mapcat` here returns an iterator of fully
                // configured line components
                mapcat(
                    (attribs) =>
                        map(
                            ([[h, translate, theta], delta]: any[]) =>
                                // the `gesture` value is a pre-curried component fn
                                // (built by the the above transducer chain). we can
                                // configure it further using additional attributes to
                                // draw multiple instances.
                                [
                                    gesture,
                                    {
                                        stroke: `hsl(${
                                            h + (delta - 0.5) * 40
                                        },100%,50%)`,
                                        rotate: theta + (delta - 0.5) * 0.3,
                                        translate,
                                    },
                                ],
                            // iterator which forms tuples of `[attribs, counter]`
                            zip(repeat(attribs), normRange(6))
                        ),
                    // configurations for the replicated strokes
                    [
                        [30, [0, 0], 0],
                        [120, [W, W], PI],
                        [210, [W, 0], HALF_PI],
                        [300, [0, W], -HALF_PI],
                    ]
                ),
            ],
        ],
        // back in normal DOM
        [
            "a.db.link",
            {
                href:
                    "https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw",
            },
            "Source code",
        ],
    ];
};

// main stream combinator: initially only a single dummy `trigger` input
// is assigned to kick off rendering... in the 1st frame the canvas
// component's `init` method is called which attaches the above gesture
// stream dynamically. the entire UI then only updates when there are new
// user interactions...
const main = sync<any, any>({
    src: { trigger: trigger() },
    closeIn: CloseMode.NEVER,
});
// transform result stream using the
// root component fn and the hdom differential
// update transducer
main.transform(map(app(main)), updateDOM());
