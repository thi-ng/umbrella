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

const SIZE = 640;

const ff = (x: number) => x.toExponential(8);

const app = () => {
    let img: ImageData;
    const canvas = canvas2D({
        init: (el, ctx) => {
            img = ctx.getImageData(0, 0, el.width, el.height);
            sync({ src: { x1, y1, x2, y2, n } })
                .transform(map((obj) => ({ ...obj, w: el.width, h: el.height })))
                .subscribe(tunnel({ src: "./worker.js", interrupt: true }))
                .subscribe({
                    next: (pix: ArrayBuffer) => {
                        img.data.set(new Uint8Array(pix));
                        ctx.putImageData(img, 0, 0);
                    }
                });
            gestureStream(el, { scale: true })
                .subscribe({
                    next: ([type, g]: [GestureType, any]) => {
                        switch (type) {
                            case GestureType.START:
                                sel1.next(g.pos);
                                sel2.next(g.pos);
                                break;
                            case GestureType.DRAG:
                                sel2.next(g.pos);
                                break;
                            case GestureType.END:
                                const p = sel1.deref();
                                const _x1 = x1.deref();
                                const _y1 = y1.deref();
                                const _x2 = x2.deref();
                                const _y2 = y2.deref();
                                let ax = fit(p[0], 0, el.width, _x1, _x2);
                                let ay = fit(p[1], 0, el.height, _y1, _y2);
                                let bx = fit(g.pos[0], 0, el.width, _x1, _x2);
                                let by = fit(g.pos[1], 0, el.height, _y1, _y2);
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
                                if (aspect > 1) {
                                    by = ay + (bx - ax);
                                } else if (aspect < 1) {
                                    bx = ax + (by - ay);
                                }
                                x1.next(ax);
                                y1.next(ay);
                                x2.next(bx);
                                y2.next(by);
                                sel2.next(null);
                                sel1.next(null);
                        }
                    }
                })
        },
        update: (_, ctx, ...args) => {
            const a = args[4];
            const b = args[5];
            ctx.putImageData(img, 0, 0);
            if (a && b) {
                ctx.strokeStyle = "red";
                ctx.strokeRect(a[0], a[1], b[0] - a[0], b[1] - a[1]);
            }
        }
    });
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

const x1 = stream<number>();
const y1 = stream<number>();
const x2 = stream<number>();
const y2 = stream<number>();
const n = stream<number>();
const sel1 = stream<number[]>();
const sel2 = stream<number[]>();

const main = sync({ src: { x1, y1, x2, y2, n, sel1, sel2 } });
main.subscribe({
    next: ({ x1, y1, x2, y2, n }) =>
        location.hash = `${ff(x1)};${ff(y1)};${ff(x2)};${ff(y2)};${n}`
});

main.transform(
    map(app()),
    updateDOM()
);

run(
    map(([src, x]) => src.next(x)),
    tuples(
        [x1, y1, x2, y2, n],
        location.hash.length > 1 ?
            location.hash.substr(1).split(";").map(parseFloat) :
            [-1.65, -1, 0.65, 1, 128]
    )
);

sel1.next(null);
sel2.next(null);

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => main.done());
}

window["main"] = main;