import { start } from "@thi.ng/hiccup-dom";
import { fromRAF } from "@thi.ng/rstream/from/raf";
import { Stream } from "@thi.ng/rstream/stream";
import * as tx from "@thi.ng/transducers";

// pre-defined hex formatters
const hex4 = tx.hex(4);
const hex6 = tx.hex(6);

/**
 * Single box component. Uses given id to switch between using
 * `div` or `box` element types, compute color and body text.
 *
 * @param id
 */
const box = (index: number, id: number) => [
    (id & 1) ? "div" : "box",
    { key: index, style: { background: "#" + hex6((id & 0x1ff) << 15 | id << 10 | id) } },
    hex4(id & 0xffff)
];

/**
 * Simple generic drop down component.
 *
 * @param change onchange listener
 * @param items drop down options `[value, label]`
 */
const dropdown = (onchange: (e: Event) => void, items: [any, any][]) =>
    tx.transduce(
        tx.map(([value, label]) => <any>["option", { value }, label]),
        tx.push(),
        ["select", { onchange }],
        items
    );

/**
 * Re-usable FPS stats canvas component, displaying graph of
 * simple moving avarage of the past `period` frames.
 * If `stream` is given, uses the time interval between received
 * values. If not given, attaches itself to a RAF event stream.
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
        tx.comp(
            tx.benchmark(),
            tx.movingAverage(period),
            tx.map(x => 1000 / x),
            tx.partition(width, 1, true)
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
    const menu = dropdown(
        (e) => { num = parseInt((<HTMLInputElement>e.target).value); },
        [[128, 128], [192, 192], [256, 256], [384, 384], [512, 512]]
    );

    return () => {
        let j = (++i) & 0x1ff;
        return ["div",
            ["div#stats", fps, menu],
            ["grid", ...tx.iterator(tx.mapIndexed(box), tx.range(j, j + num))]
        ];
    };
};

start(document.getElementById("app"), app(), false);
