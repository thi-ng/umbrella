import { downloadCanvas } from "@thi.ng/dl-asset/canvas";
import { equiv } from "@thi.ng/equiv";
import { canvas2D } from "@thi.ng/hdom-components/canvas";
import { fit } from "@thi.ng/math/fit";
import { mix } from "@thi.ng/math/mix";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { Stream, stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/sync";
import { tunnel } from "@thi.ng/rstream/tunnel";
import { Z4 } from "@thi.ng/strings/pad-left";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers/map";
import WORKER from "./worker?worker";

// if enabled, auto-zoom out & export frames
// (in this case also update initial DEFAULT_CONFIG below)
const AUTO_ZOOM = false;

// frame export helpers
let frame = 0;

// canvas size
const SIZE = 640;

// default region / configuration
// x1, y1, x2, y2, iter, gradient
const DEFAULT_CONFIG = [-1.65, -1, 0.65, 1, 128, 0];

// mandelbrot parameter streams
const x1 = stream<number>();
const y1 = stream<number>();
const x2 = stream<number>();
const y2 = stream<number>();
const iter = stream<number>();
const gradient = stream<number>();
const sel1 = stream<number[] | null>();
const sel2 = stream<number[] | null>();

// main stream combinator
const main = sync({
    src: { x1, y1, x2, y2, iter, gradient, sel1, sel2 },
});

// URL hash updater
main.subscribe({
    next: ({ x1, y1, x2, y2, iter, gradient }) =>
        (location.hash = `${ff(x1)};${ff(y1)};${ff(x2)};${ff(
            y2
        )};${iter};${gradient}`),
});

// update param streams to trigger new render
const newRender = (
    a: number,
    b: number,
    c: number,
    d: number,
    i?: number,
    g?: number
) => {
    x1.next(a);
    y1.next(b);
    x2.next(c);
    y2.next(d);
    i !== undefined && iter.next(i);
    g !== undefined && gradient.next(g);
    // clear selection
    sel1.next(null);
    sel2.next(null);
};

const updateZoom = (zoom: number) => {
    let _x1 = x1.deref()!;
    let _y1 = y1.deref()!;
    let _x2 = x2.deref()!;
    let _y2 = y2.deref()!;
    newRender(
        mix(_x1, _x2, zoom),
        mix(_y1, _y2, zoom),
        mix(_x2, _x1, zoom),
        mix(_y2, _y1, zoom)
    );
};

// formatting helper (for URL hash)
const ff = (x: number) => x.toExponential(10);

// root component HOF
const app = () => {
    let img: ImageData;
    // canvas HOF component
    const canvas = canvas2D({
        // canvas init lifecycle method
        init: (el, ctx) => {
            // obtain canvas pixel buffer
            img = ctx.getImageData(0, 0, el.width, el.height);
            // setup render task stream pipeline
            // first we combine the various parameter streams
            // augment with canvas size
            // then submit tuple to worker and copy resulting pixels to canvas

            // any currently active worker will be terminated and
            // restarted with each param change. this is achieved via
            // the `interrupt` option and ensures only the most recent
            // configuration is being fully executed without having to
            // wait for older render tasks to complete...
            sync({ src: { x1, y1, x2, y2, iter, gradient } })
                .map((obj) => ({ ...obj, w: el.width, h: el.height }))
                .subscribe(
                    tunnel<any, any>({
                        src: () => new WORKER(),
                        interrupt: true,
                    })
                )
                .subscribe({
                    next(pix: any) {
                        img.data.set(new Uint8Array(<ArrayBuffer>pix));
                        ctx.putImageData(img, 0, 0);
                        // frame export & auto zoom out
                        if (AUTO_ZOOM) {
                            downloadCanvas(el, `frame-${Z4(frame++)}`);
                            setTimeout(() => updateZoom(-0.02), 100);
                        }
                    },
                });
            // also initialize gesture stream for allowing users to draw
            // target zoom rectangle
            gestureStream(el, {
                scale: true,
                absZoom: false,
                smooth: 1e-3,
            }).subscribe({
                next(e) {
                    const _x1 = x1.deref()!;
                    const _y1 = y1.deref()!;
                    const _x2 = x2.deref()!;
                    const _y2 = y2.deref()!;
                    switch (e.type) {
                        case "start":
                            sel1.next(e.pos);
                            break;
                        case "drag":
                            sel2.next(e.pos);
                            break;
                        case "end": {
                            const p = sel1.deref();
                            if (!p || equiv(p, e.pos)) return;
                            // compute target coord based on current zoom region
                            let ax = fit(p[0], 0, el.width, _x1, _x2);
                            let ay = fit(p[1], 0, el.height, _y1, _y2);
                            let bx = fit(e.pos[0], 0, el.width, _x1, _x2);
                            let by = fit(e.pos[1], 0, el.height, _y1, _y2);
                            if (ax > bx) {
                                const t = ax;
                                ax = bx;
                                bx = t;
                            }
                            if (ay > by) {
                                const t = ay;
                                ay = by;
                                by = t;
                            }
                            const aspect = (bx - ax) / (by - ay);
                            // adjust aspect ratio of target region
                            if (aspect > 1) {
                                by = ay + (bx - ax);
                            } else if (aspect < 1) {
                                bx = ax + (by - ay);
                            }
                            newRender(ax, ay, bx, by);
                            break;
                        }
                        case "zoom":
                            updateZoom(e.zoom);
                            break;
                        default:
                    }
                },
            });
            // key controls fine tuning region
            window.addEventListener("keydown", (e) => {
                let _x1 = x1.deref()!;
                let _y1 = y1.deref()!;
                let _x2 = x2.deref()!;
                let _y2 = y2.deref()!;
                const amp = e.shiftKey ? 0.1 : 0.01;
                const deltaX = (_x2 - _x1) * amp;
                const deltaY = (_y2 - _y1) * amp;
                switch (e.code) {
                    case "ArrowDown":
                        _y1 += deltaY;
                        _y2 += deltaY;
                        newRender(_x1, _y1, _x2, _y2);
                        break;
                    case "ArrowUp":
                        _y1 -= deltaY;
                        _y2 -= deltaY;
                        newRender(_x1, _y1, _x2, _y2);
                        break;
                    case "ArrowLeft":
                        _x1 -= deltaX;
                        _x2 -= deltaX;
                        newRender(_x1, _y1, _x2, _y2);
                        break;
                    case "ArrowRight":
                        _x1 += deltaX;
                        _x2 += deltaX;
                        newRender(_x1, _y1, _x2, _y2);
                        break;
                }
            });
        },
        // canvas update handler
        update: (_, ctx, ...args) => {
            const a = args[4];
            const b = args[5];
            ctx.putImageData(img, 0, 0);
            // if given, draw zoom rectangle
            if (a && b) {
                ctx.strokeStyle = "red";
                ctx.strokeRect(a[0], a[1], b[0] - a[0], b[1] - a[1]);
            }
        },
    });
    // return actual root component function
    return ({ sel1, sel2 }: any) => {
        return [
            "div.flex-l.sans-serif.f7",
            [canvas, { id: "main", width: SIZE, height: SIZE }, sel1, sel2],
            [
                "div.pa2.lh-copy",
                ["h1.ma0", "Mandelbrot explorer"],
                [slider, x1, -2.5, 1, 1e-8, "x1"],
                [slider, y1, -1, 1, 1e-8, "y1"],
                [slider, x2, -2.5, 1, 1e-8, "x2"],
                [slider, y2, -1, 1, 1e-8, "y2"],
                [slider, iter, 1, 1000, 1, "iter"],
                [slider, gradient, 0, 4, 0, "gradient"],
                [
                    "button",
                    {
                        onclick: () =>
                            newRender.apply(null, <any>DEFAULT_CONFIG),
                    },
                    "reset",
                ],
                [
                    "div",
                    [
                        "ul",
                        ["li", "Click & drag to draw target zoom rectangle"],
                        ["li", "Mouse wheel to zoom in / out"],
                        [
                            "li",
                            "Cursor keys to fine tune region (+ Shift for bigger steps)",
                        ],
                    ],
                ],
            ],
        ];
    };
};

// slider component which emits value changes on given stream
const slider = (
    _: any,
    stream: Stream<any>,
    min: number,
    max: number,
    step: number,
    label: string
) => [
    "div",
    ["div", ["strong", `${label}: `], stream.deref()],
    [
        "input",
        {
            type: "range",
            style: { width: "50vw" },
            min,
            max,
            step,
            value: stream.deref(),
            oninput: (e: Event) =>
                stream.next(parseFloat((<HTMLInputElement>e.target).value)),
        },
    ],
];

// attach root component & DOM update to main stream
main.transform(map(app()), updateDOM());

// init parameter streams, if possible from location.hash
newRender.apply(
    null,
    <any>(
        (location.hash.length > 1
            ? location.hash.substr(1).split(";").map(parseFloat)
            : DEFAULT_CONFIG)
    )
);
