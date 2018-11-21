import { equiv } from "@thi.ng/equiv";
import { canvas2D } from "@thi.ng/hdom-components/canvas";
import { fit } from "@thi.ng/math/fit";
import { gestureStream, GestureType } from "@thi.ng/rstream-gestures";
import { stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/stream-sync";
import { tunnel } from "@thi.ng/rstream/tunnel";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { run } from "@thi.ng/transducers/run";
import { map } from "@thi.ng/transducers/xform/map";

// canvas size
const SIZE = 640;

// format helper (for URL hash)
const ff = (x: number) => x.toExponential(8);

// mandelbrot parameter streams
const x1 = stream<number>();
const y1 = stream<number>();
const x2 = stream<number>();
const y2 = stream<number>();
const n = stream<number>();
const sel1 = stream<number[]>();
const sel2 = stream<number[]>();

// main stream combinator
const main = sync({ src: { x1, y1, x2, y2, n, sel1, sel2 } });

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
            sync({ src: { x1, y1, x2, y2, n } })
                .transform(map((obj) => ({ ...obj, w: el.width, h: el.height })))
                .subscribe(tunnel({ src: "./worker.js", interrupt: true }))
                .subscribe({
                    next: (pix: ArrayBuffer) => {
                        img.data.set(new Uint8Array(pix));
                        ctx.putImageData(img, 0, 0);
                    }
                });
            // also initialize gesture stream for allowing users to draw
            // target zoom rectangle
            gestureStream(el, { scale: true })
                .subscribe({
                    next: ([type, { pos }]: [GestureType, any]) => {
                        switch (type) {
                            case GestureType.START:
                                sel1.next(pos);
                                break;
                            case GestureType.DRAG:
                                sel2.next(pos);
                                break;
                            case GestureType.END:
                                const p = sel1.deref();
                                if (equiv(p, pos)) return;
                                const _x1 = x1.deref();
                                const _y1 = y1.deref();
                                const _x2 = x2.deref();
                                const _y2 = y2.deref();
                                // compute target coord based on current zoom region
                                let ax = fit(p[0], 0, el.width, _x1, _x2);
                                let ay = fit(p[1], 0, el.height, _y1, _y2);
                                let bx = fit(pos[0], 0, el.width, _x1, _x2);
                                let by = fit(pos[1], 0, el.height, _y1, _y2);
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
                                // zoom to new region
                                x1.next(ax);
                                y1.next(ay);
                                x2.next(bx);
                                y2.next(by);
                                // clear selection
                                sel1.next(null);
                                sel2.next(null);
                        }
                    }
                })
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
        }
    });
    // return actual root component function
    return ({ sel1, sel2 }) => {
        return ["div.flex-l.sans-serif.f7",
            [canvas, { width: SIZE, height: SIZE }, sel1, sel2],
            ["div.pa2.lh-copy",
                ["h1.ma0", "Mandelbrot explorer"],
                [slider, x1, -2.5, 1, 1e-8, "x1"],
                [slider, y1, -1, 1, 1e-8, "y1"],
                [slider, x2, -2.5, 1, 1e-8, "x2"],
                [slider, y2, -1, 1, 1e-8, "y2"],
                [slider, n, 1, 1000, 1, "iter"],
                ["div",
                    "Click & drag to draw target zoom rectangle"
                ]
            ]
        ];
    };
};

// slider component which emits value changes on given stream
const slider = (_, stream, min, max, step, label) =>
    ["div",
        ["div", ["strong", `${label}: `], stream.deref()],
        ["input", {
            type: "range",
            style: { width: "50vw" },
            min,
            max,
            step,
            value: stream.deref(),
            oninput: (e) => stream.next(parseFloat(e.target.value)),
        }]
    ];

// URL hash updater
main.subscribe({
    next: ({ x1, y1, x2, y2, n }) =>
        location.hash = `${ff(x1)};${ff(y1)};${ff(x2)};${ff(y2)};${n}`
});

// attach root component & DOM update to main stream
main.transform(
    map(app()),
    updateDOM()
);

// pre-seed parameter streams, if possible from location.hash
run(
    map(([src, x]) => src.next(x)),
    tuples(
        [x1, y1, x2, y2, n],
        location.hash.length > 1 ?
            location.hash.substr(1).split(";").map(parseFloat) :
            [-1.65, -1, 0.65, 1, 128]
    )
);

// pre-seed selection stream (zoom rect)
sel1.next(null);
sel2.next(null);

// HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => main.done());
}
