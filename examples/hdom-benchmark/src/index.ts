import { start } from "@thi.ng/hdom";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { fromRAF } from "@thi.ng/rstream/from/raf";
import { Stream } from "@thi.ng/rstream/stream";
import { radix } from "@thi.ng/strings/radix";
import { comp } from "@thi.ng/transducers/func/comp";
import { range } from "@thi.ng/transducers/iter/range";
import { benchmark } from "@thi.ng/transducers/xform/benchmark";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { movingAverage } from "@thi.ng/transducers/xform/moving-average";
import { partition } from "@thi.ng/transducers/xform/partition";

// pre-defined hex formatters
const hex4 = radix(16, 4);
const hex6 = radix(16, 6);

/**
 * Single box component. Uses given id to switch between using `div` or
 * `box` element types, computes color and body text.
 *
 * @param id
 */
const box = (index: number, id: number) => [
    (id & 1) ? "div" : "box",
    { key: index, style: { background: "#" + hex6((id & 0x1ff) << 15 | id << 10 | id) } },
    hex4(id & 0xffff)
];

/**
 * Re-usable FPS stats canvas component, displaying graph of simple
 * moving avarage of the past `period` frames. If `stream` is given,
 * uses the time interval between received values. If not given,
 * attaches itself to a new RAF event stream.
 *
 * @param src
 * @param width
 * @param height
 * @param period
 * @param col
 * @param txtCol
 */
const fpsCounter = (src: Stream<any>, width = 100, height = 30, period = 50, col = "#09f", txtCol = "#000") => {
    let ctx;
    let scale = height / 60;
    (src || fromRAF()).subscribe(
        {
            next(samples) {
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.moveTo(0, height);
                for (let i = 0; i < width; i++) {
                    ctx.lineTo(i, height - samples[i] * scale);
                }
                ctx.lineTo(width - 1, height);
                ctx.fill();
                ctx.fillStyle = txtCol;
                ctx.fillText(`SMA(${period}): ${samples[width - 1].toFixed(1)} fps`, 2, height - 4);
            }
        },
        // stream transducer to compute the windowed moving avarage
        comp(
            benchmark(),
            movingAverage(period),
            map((x) => 1000 / x),
            partition(width, 1, true)
        )
    );
    return [{
        init: (el) => {
            ctx = el.getContext("2d");
            ctx.fillStyle = txtCol;
            ctx.fillText("sampling...", 2, height - 4);
        },
        render: () => ["canvas", { width, height }]
    }];
};

/**
 *  Main app root component
 */
const app = () => {
    // initialize local state
    let i = 0, num = 128;
    const fps = fpsCounter(null, 100, 60);
    const menu = dropdown(null,
        { onchange: (e) => { num = parseInt((<HTMLInputElement>e.target).value); } },
        [[128, 128], [192, 192], [256, 256], [384, 384], [512, 512]]
    );

    return () => {
        let j = (++i) & 0x1ff;
        return ["div",
            ["div#stats", fps, menu],
            ["grid", mapIndexed(box, range(j, j + num))]
        ];
    };
};

start(app(), { span: false });
