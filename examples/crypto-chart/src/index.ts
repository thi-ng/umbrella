import { diffElement, normalizeTree } from "@thi.ng/hdom";
import { dropdown, DropDownOption } from "@thi.ng/hdom-components";
import {
    group,
    line,
    polyline,
    rect,
    svg,
    text
} from "@thi.ng/hiccup-svg";
import { resolve } from "@thi.ng/resolve-map";
import {
    comp,
    filter,
    iterator,
    map,
    mapcat,
    mapIndexed,
    max,
    min,
    movingAverage,
    pairs,
    pluck,
    push,
    range,
    reducer,
    scan,
    transduce
} from "@thi.ng/transducers";
import {
    fromEvent,
    resolve as resolvePromise,
    Stream,
    sync,
} from "@thi.ng/rstream";

// this example demonstrates how to use @thi.ng/rstream &
// @thi.ng/transducer constructs to create a basic cryptocurrency candle
// chart. unlike most other examples in this repo, there's no additional
// state handling used (e.g. via @thi.ng/atom constructs) and the entire
// app largely relies on various stream combinators & transformers.
// furthermore, this approach only triggers UI updates/diffs when there
// were any relevant upstream value changes.

// constant definitions

// supported chart (and API) timeframes
export const TIMEFRAMES = {
    1: "Minute",
    60: "Hour",
    1440: "Day",
};

// supported symbol pairs
const SYMBOL_PAIRS: DropDownOption[] = [
    ["BTCUSD", "BTC-USD"],
    ["ETHUSD", "ETH-USD"],
    ["LTCUSD", "LTC-USD"],
];

// chart settings
const MARGIN_X = 60;
const MARGIN_Y = 50;
const DAY = 60 * 60 * 24;

const PRICE_TICKS = {
    1: 25,
    60: 50,
    1440: 250
};

const TIME_TICKS = {
    1: 15 * 60,
    60: DAY,
    1440: DAY * 7
};

// constructs request URL from given inputs
const API_URL = (market, symbol, period) =>
    `https://min-api.cryptocompare.com/data/histo${TIMEFRAMES[period].toLowerCase()}?fsym=${symbol.substr(0, 3)}&tsym=${symbol.substr(3)}&limit=168&aggregate=1&e=${market}`;

// stub for local testing
// const API_URL = (..._) => `ohlc.json`;

// helper functions
const clamp = (x: number, min: number, max: number) => x < min ? min : x > max ? max : x;
const fit = (x, a, b, c, d) => c + (d - c) * clamp((x - a) / (b - a), 0, 1);

const fmtTime = (t: number) => {
    const d = new Date(t * 1000);
    console.log(d);
    return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
};

const emitOnStream = (stream) => (e) => stream.next(e.target.value);

// stream definitions

const market = new Stream();
const symbol = new Stream();
const period = new Stream();
const error = new Stream();

// I/O error handler
error.subscribe({ next: (e) => alert(`An error occurred:\n${e}`) });

// this stream combinator performs API requests to obtain OHLC data
// and if successful computes a number of statistics
const data = sync({
    src: { market, symbol, period },
    reset: false,
    xform: map((inst) =>
        fetch(API_URL(inst.market, inst.symbol, inst.period))
            .then(
                (res) => res.ok ? res.json() : error.next("error loading OHLC data"),
                (e) => error.next(e.message)
            )
            .then((json) => ({ ...inst, ohlc: json ? json.Data : null }))
    )
})
    .subscribe(resolvePromise({ fail: (e) => error.next(e.message) }))
    .transform(
        // bail if stream value has no OHLC data
        filter((x) => !!x.ohlc),
        // use @thi.ng/resolve-map to compute bounds & moving averages
        map((inst: any) => resolve({
            ...inst,
            min: ({ ohlc }) => transduce(pluck("low"), min(), ohlc),
            max: ({ ohlc }) => transduce(pluck("high"), max(), ohlc),
            tbounds: ({ ohlc }) => [ohlc[0].time, ohlc[ohlc.length - 1].time],
            sma12: ({ ohlc }) => transduce(comp(pluck("close"), movingAverage(12)), push(), ohlc),
            sma24: ({ ohlc }) => transduce(comp(pluck("close"), movingAverage(24)), push(), ohlc),
            sma50: ({ ohlc }) => transduce(comp(pluck("close"), movingAverage(50)), push(), ohlc)
        }))
    );

// this stream combinator (re)computes the SVG chart
const chart = sync({
    src: {
        data,
        window: fromEvent(window, "resize").transform(
            map(() => [window.innerWidth, window.innerHeight])
        )
    },
    reset: false,
    xform: map(({ data, window }) => {
        let [width, height] = window;
        const ohlc = data.ohlc;
        const w = (width - MARGIN_X) / ohlc.length;
        const by = height - MARGIN_Y;
        const mapX = (x: number) => fit(x, 0, ohlc.length, MARGIN_X, width - MARGIN_X);
        const mapY = (y: number) => fit(y, data.min, data.max, by, MARGIN_Y);
        const tickX = TIME_TICKS[data.period];
        const tickY = PRICE_TICKS[data.period];
        return svg(
            { width, height, "font-family": "Arial", "font-size": "10px" },
            group({ stroke: "black", fill: "black", "text-anchor": "end" },
                line([MARGIN_X, MARGIN_Y], [MARGIN_X, by]),
                line([MARGIN_X, by], [width - MARGIN_X, by]),
                ...iterator(
                    mapcat((price: number) => {
                        const y = mapY(price);
                        return [
                            line([MARGIN_X - 10, y], [MARGIN_X, y]),
                            line([MARGIN_X, y], [width - MARGIN_X, y], { stroke: (price % 100 < 1) ? "#666" : "#ccc", "stroke-dasharray": 2 }),
                            text(price.toFixed(2), [MARGIN_X - 15, y + 4], { stroke: "none" })
                        ];
                    }),
                    range(Math.ceil(data.min / tickY) * tickY, data.max, tickY)
                ),
                ...iterator(
                    mapcat((t: number) => {
                        const x = fit(t, data.tbounds[0], data.tbounds[1], MARGIN_X + w / 2, width - MARGIN_X - w / 2);
                        return [
                            line([x, by], [x, by + 10]),
                            line([x, MARGIN_Y], [x, by], { stroke: "#ccc", "stroke-dasharray": 2 }),
                            text(fmtTime(t), [x, by + 20], { stroke: "none", "text-anchor": "middle" })
                        ];
                    }),
                    range(Math.ceil(data.tbounds[0] / tickX) * tickX, data.tbounds[1], tickX)
                ),

            ),
            polyline(
                data.sma12.map((y, x) => [mapX(x + 12.5), mapY(y)]),
                { stroke: "#00f", fill: "none" }
            ),
            polyline(
                data.sma24.map((y, x) => [mapX(x + 24.5), mapY(y)]),
                { stroke: "#07f", fill: "none" }
            ),
            polyline(
                data.sma50.map((y, x) => [mapX(x + 50.5), mapY(y)]),
                { stroke: "#0ff", fill: "none" }
            ),
            ...iterator(
                mapIndexed((i, candle: any) => {
                    const isBullish = candle.open < candle.close;
                    let y, h;
                    let col;
                    if (isBullish) {
                        col = "#6c0";
                        y = mapY(candle.close);
                        h = mapY(candle.open) - y;
                    } else {
                        col = "#f04";
                        y = mapY(candle.open);
                        h = mapY(candle.close) - y;
                    }
                    return group({ fill: col, stroke: col },
                        line([mapX(i + 0.5), mapY(candle.low)], [mapX(i + 0.5), mapY(candle.high)]),
                        rect([mapX(i) + 1, y], w - 2, h),
                    );
                }),
                ohlc
            )
        )
    })
});

// stream construct to perform UI update
sync({
    src: {
        chart,
        // transform symbol stream into dropdown component
        symbol: symbol.transform(
            map((x: string) =>
                dropdown(
                    null,
                    { class: "w4 mr3", onchange: emitOnStream(symbol) },
                    SYMBOL_PAIRS,
                    x
                )
            )
        ),
        // transform period stream into dropdown component
        period: period.transform(
            map((x: string) =>
                dropdown(
                    null,
                    { class: "w4", onchange: emitOnStream(period) },
                    [...pairs(TIMEFRAMES)],
                    String(x)
                )
            )
        )
    },
    reset: false,
    xform: comp(
        // combines all inputs into a single root component
        map(({ chart, symbol, period }) =>
            ["div.sans-serif",
                chart,
                ["div.fixed",
                    { style: { top: `10px`, right: `${MARGIN_X}px` } },
                    symbol,
                    period
                ]
            ]
        ),
        // perform hdom update / diffing
        scan<any, any>(
            reducer(
                () => [],
                (prev, curr) => {
                    curr = normalizeTree(curr, {});
                    diffElement(document.getElementById("app"), prev, curr);
                    return curr;
                }
            )
        )
    )
});

// kick off dataflow
market.next("CCCAGG");
symbol.next("BTCUSD");
period.next(60);
window.dispatchEvent(new CustomEvent("resize"));
