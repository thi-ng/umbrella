import { start } from "@thi.ng/hiccup-dom";
import { fromRAF } from "@thi.ng/rstream/from/raf";
import * as tx from "@thi.ng/transducers";

const hex4 = tx.hex(4);
const hex6 = tx.hex(6);

const box = (x: number) => [
    (x & 1) ? "div" : "box",
    { style: { background: "#" + hex6((x & 0x1ff) << 15 | x << 10 | x) } },
    hex4(x & 0xffff)
];

const dropdown = (change, items) =>
    tx.transduce(
        tx.map<any, any>(([value, label]) => ["option", { value }, label]),
        tx.push(),
        ["select", { "on-change": change }],
        items
    );

const fpsCounter = (src, width = 100, height = 30, period = 50, col = "#09f", txtCol = "#000") => {
    let ctx;
    let scale = height / 60;
    src.subscribe(
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
        tx.comp(
            tx.benchmark(),
            tx.movingAverage(period),
            tx.map(x => 1000 / x),
            tx.partition(width, 1, true)
        )
    );
    return [{
        init: (el) => (ctx = el.getContext("2d")),
        render: () => ["canvas", { width, height }]
    }];
};

let i = 0;
let num = 128;

const fps = fpsCounter(fromRAF(), 100, 60);

const menu = dropdown(
    (e) => { num = parseInt(e.target.value); },
    [[128, 128], [192, 192], [256, 256], [384, 384], [512, 512]]
);

const app = () => {
    let j = (++i) & 0x1ff;
    return ["div",
        ["div#stats", fps, menu],
        tx.transduce(tx.map<any, any>(box), tx.push(), ["grid"], tx.range(j, j + num))];
};

start(document.getElementById("app"), app());
