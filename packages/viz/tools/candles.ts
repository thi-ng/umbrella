import { serialize } from "@thi.ng/hiccup";
import { convertTree, svg } from "@thi.ng/hiccup-svg";
import { float, Z2 } from "@thi.ng/strings";
import { readFileSync, writeFileSync } from "fs";
import {
    candle,
    candlePlot,
    dataBounds,
    dataMax,
    dataMin,
    days,
    HOUR,
    linearAxis,
    linearTicks,
    plotCartesian,
} from "../src";

const prices: any[] = JSON.parse(
    readFileSync("dev/ohlc.json").toString()
).Data.map((x: any) => ({ ...x, time: x.time * 1000 }));
const domain = dataBounds((x) => x.time, prices, 1 * HOUR);
const res = plotCartesian({
    xaxis: linearAxis({
        domain,
        range: [100, 1250],
        pos: 500,
        labelOffset: [0, 20],
        labelAttribs: { "text-anchor": "middle" },
        format: (x) => {
            const d = new Date(x);
            return `${d.getFullYear()}-${Z2(d.getMonth() + 1)}-${Z2(
                d.getDate()
            )}`;
        },
        major: { ticks: days },
        minor: { ticks: () => [] },
    }),
    yaxis: linearAxis({
        domain: [
            dataMin((x) => x.low, prices, 50),
            dataMax((x) => x.high, prices, 50),
        ],
        range: [500, 20],
        pos: 100,
        labelOffset: [-15, 3],
        labelAttribs: { "text-anchor": "end" },
        format: (x) => `$${float(2)(x)}`,
        major: { ticks: linearTicks(100) },
        minor: { ticks: linearTicks(50) },
    }),
    plots: [
        candlePlot(
            prices.map((p: any) => [
                p.time,
                { o: p.open, h: p.high, l: p.low, c: p.close },
            ]),
            {
                shape: candle(),
            }
        ),
    ],
});

writeFileSync(
    "export/candles.svg",
    serialize(
        convertTree(svg({ width: 1280, height: 560, "font-size": "10px" }, res))
    )
);
