import { dropdown, DropDownOption } from "@thi.ng/hdom-components/dropdown";
import { diffElement } from "@thi.ng/hdom/diff";
import { normalizeTree } from "@thi.ng/hdom/normalize";
import { group } from "@thi.ng/hiccup-svg/group";
import { line } from "@thi.ng/hiccup-svg/line";
import { polygon } from "@thi.ng/hiccup-svg/polygon";
import { polyline } from "@thi.ng/hiccup-svg/polyline";
import { rect } from "@thi.ng/hiccup-svg/rect";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { text } from "@thi.ng/hiccup-svg/text";
import { resolve } from "@thi.ng/resolve-map";
import { fromEvent } from "@thi.ng/rstream/from/event";
import { fromInterval } from "@thi.ng/rstream/from/interval";
import { Stream } from "@thi.ng/rstream/stream";
import { sync } from "@thi.ng/rstream/stream-sync";
import { resolve as resolvePromise } from "@thi.ng/rstream/subs/resolve";
import { trace } from "@thi.ng/rstream/subs/trace";
import { comp } from "@thi.ng/transducers/func/comp";
import { pairs } from "@thi.ng/transducers/iter/pairs";
import { range } from "@thi.ng/transducers/iter/range";
import { iterator } from "@thi.ng/transducers/iterator";
import { reducer } from "@thi.ng/transducers/reduce";
import { max } from "@thi.ng/transducers/rfn/max";
import { min } from "@thi.ng/transducers/rfn/min";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { filter } from "@thi.ng/transducers/xform/filter";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { movingAverage } from "@thi.ng/transducers/xform/moving-average";
import { pluck } from "@thi.ng/transducers/xform/pluck";
import { scan } from "@thi.ng/transducers/xform/scan";

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
    ["ADAUSD", "ADA-USD"],
    ["BTCUSD", "BTC-USD"],
    ["ETHUSD", "ETH-USD"],
    ["LTCUSD", "LTC-USD"],
    ["XLMUSD", "XLM-USD"],
    ["XMRUSD", "XMR-USD"],
];

// chart settings
const MARGIN_X = 80;
const MARGIN_Y = 50;
const DAY = 60 * 60 * 24;

const TIME_TICKS = {
    1: 15 * 60,
    60: DAY,
    1440: DAY * 14
};

const TIME_FORMATS = {
    1: (t: number) => {
        const d = new Date(t * 1000);
        return `${Z2(d.getUTCHours())}:${Z2(d.getUTCMinutes())}`;
    },
    60: (t: number) => {
        const d = new Date(t * 1000);
        return `${d.getUTCFullYear()}-${Z2(d.getUTCMonth() + 1)}-${Z2(d.getUTCDate())}`;
    },
    1440: (t: number) => {
        const d = new Date(t * 1000);
        return `${d.getUTCFullYear()}-${Z2(d.getUTCMonth() + 1)}-${Z2(d.getUTCDate())}`;
    }
};

// UI theme presets
const THEMES = {
    light: {
        id: "light",
        bg: "white",
        body: "black",
        chart: {
            axis: "#000",
            price: "#006",
            pricelabel: "#fff",
            bull: "#6c0",
            bear: "#f04",
            sma12: "#f90",
            sma24: "#0ff",
            sma50: "#06f",
            sma72: "#00f",
            gridMajor: "#666",
            gridMinor: "#ccc",
        }
    },
    dark: {
        id: "dark",
        bg: "black",
        body: "white",
        chart: {
            axis: "#eee",
            price: "#f0f",
            pricelabel: "#fff",
            bull: "#0c4",
            bear: "#f02",
            sma12: "#ff0",
            sma24: "#0ff",
            sma50: "#06f",
            sma72: "#00f",
            gridMajor: "#666",
            gridMinor: "#333",
        }
    },
};

// constructs request URL from given inputs
// API docs: https://min-api.cryptocompare.com/
const API_URL = (market, symbol, period) =>
    `https://min-api.cryptocompare.com/data/histo${TIMEFRAMES[period].toLowerCase()}?fsym=${symbol.substr(0, 3)}&tsym=${symbol.substr(3)}&limit=168&aggregate=1&e=${market}`;

// stub for local testing
// const API_URL = (..._) => `ohlc.json`;

// helper functions
const clamp = (x: number, min: number, max: number) => x < min ? min : x > max ? max : x;
const fit = (x, a, b, c, d) => c + (d - c) * clamp((x - a) / (b - a), 0, 1);
const padl = (n: number, ch: string) => {
    const buf = new Array(n).fill(ch).join("");
    return (x: any) => (x = x.toString(), x.length < n ? buf.substr(x.length) + x : x);
};
const Z2 = padl(2, "0");

const emitOnStream = (stream) => (e) => stream.next(e.target.value);

// stream definitions

const market = new Stream();
const symbol = new Stream();
const period = new Stream();
const theme = new Stream().transform(map((id: string) => THEMES[id]));
const error = new Stream();

// I/O error handler
error.subscribe({ next: (e) => alert(`An error occurred:\n${e}`) });

// data refresh trigger (once per minute)
const refresh = fromInterval(60000).subscribe(trace("refresh"));

// this stream combinator performs API requests to obtain OHLC data
// and if successful computes a number of statistics
const data = sync({
    src: { market, symbol, period, refresh },
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
            sma: ({ ohlc }) => transduce(
                map((period: number) => [period, transduce(comp(pluck("close"), movingAverage(period)), push(), ohlc)]),
                push(),
                [12, 24, 50, 72]
            ),
        }))
    );

// this stream combinator (re)computes the SVG chart
// updates whenever data, theme or window size has changed
const chart = sync({
    src: {
        data,
        theme,
        window: fromEvent(window, "resize").transform(
            map(() => [window.innerWidth, window.innerHeight])
        )
    },
    reset: false,
    xform: map(({ data, window, theme }) => {
        let [width, height] = window;
        const ohlc = data.ohlc;
        const w = Math.max(3, (width - 2 * MARGIN_X) / ohlc.length);
        const by = height - MARGIN_Y;

        const mapX = (x: number) => fit(x, 0, ohlc.length, MARGIN_X, width - MARGIN_X);
        const mapY = (y: number) => fit(y, data.min, data.max, by, MARGIN_Y);
        // helper fn for plotting moving averages
        const sma = (data: number[], smaPeriod: number, col: string) =>
            polyline(
                data.map((y, x) => [mapX(x + smaPeriod + 0.5), mapY(y)]),
                { stroke: col, fill: "none" }
            );

        // use preset time precisions based on current chart period
        const tickX = TIME_TICKS[data.period];
        const fmtTime: (t: number) => string = TIME_FORMATS[data.period];
        // price resolution estimation based on actual OHLC interval
        let tickY = Math.pow(10, Math.floor(Math.log(data.max - data.min) / Math.log(10))) / 2;
        while (tickY < (data.max - data.min) / 20) {
            tickY *= 2;
        }
        const lastPrice = ohlc[ohlc.length - 1].close;
        const closeX = width - MARGIN_X;
        const closeY = mapY(lastPrice);
        // inline definition of SVG chart
        return svg(
            { width, height, "font-family": "Arial", "font-size": "10px" },
            // XY axes incl. tick markers & labels
            group({ stroke: theme.chart.axis, fill: theme.chart.axis, "text-anchor": "end" },
                line([MARGIN_X, MARGIN_Y], [MARGIN_X, by]),
                line([MARGIN_X, by], [width - MARGIN_X, by]),
                // Y axis ticks
                ...iterator(
                    mapcat((price: number) => {
                        const y = mapY(price);
                        return [
                            line([MARGIN_X - 10, y], [MARGIN_X, y]),
                            line([MARGIN_X, y], [width - MARGIN_X, y], {
                                stroke: (price % 100 < 1) ?
                                    theme.chart.gridMajor :
                                    theme.chart.gridMinor,
                                "stroke-dasharray": 2
                            }),
                            text(price.toFixed(4), [MARGIN_X - 15, y + 4], { stroke: "none" })
                        ];
                    }),
                    range(Math.ceil(data.min / tickY) * tickY, data.max, tickY)
                ),
                // X axis ticks
                ...iterator(
                    mapcat((t: number) => {
                        const x = fit(t, data.tbounds[0], data.tbounds[1], MARGIN_X + w / 2, width - MARGIN_X - w / 2);
                        return [
                            line([x, by], [x, by + 10]),
                            line([x, MARGIN_Y], [x, by], { stroke: theme.chart.gridMinor, "stroke-dasharray": 2 }),
                            text(fmtTime(t), [x, by + 20], { stroke: "none", "text-anchor": "middle" })
                        ];
                    }),
                    range(Math.ceil(data.tbounds[0] / tickX) * tickX, data.tbounds[1], tickX)
                ),
            ),
            // moving averages
            ...iterator(
                map(([period, vals]) => sma(vals, period, theme.chart[`sma${period}`])),
                data.sma
            ),
            // candles
            ...iterator(
                mapIndexed((i, candle: any) => {
                    const isBullish = candle.open < candle.close;
                    let y, h;
                    let col;
                    if (isBullish) {
                        col = theme.chart.bull;
                        y = mapY(candle.close);
                        h = mapY(candle.open) - y;
                    } else {
                        col = theme.chart.bear;
                        y = mapY(candle.open);
                        h = mapY(candle.close) - y;
                    }
                    return group({ fill: col, stroke: col },
                        line([mapX(i + 0.5), mapY(candle.low)], [mapX(i + 0.5), mapY(candle.high)]),
                        rect([mapX(i) + 1, y], w - 2, h),
                    );
                }),
                ohlc
            ),
            // price line
            line([MARGIN_X, closeY], [closeX, closeY], { stroke: theme.chart.price }),
            // tag
            polygon(
                [[closeX, closeY], [closeX + 10, closeY - 8], [width, closeY - 8], [width, closeY + 8], [closeX + 10, closeY + 8]],
                { fill: theme.chart.price }
            ),
            text(lastPrice.toFixed(4), [closeX + 12, closeY + 4], { fill: theme.chart.pricelabel }),
        )
    })
});

// stream construct to perform UI update
sync({
    src: {
        chart,
        theme,
        // transform symbol stream into dropdown component
        symbol: symbol.transform(
            map((x: string) =>
                dropdown(
                    null,
                    { class: "w3 w4-ns mr2", onchange: emitOnStream(symbol) },
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
                    { class: "w3 w4-ns mr2", onchange: emitOnStream(period) },
                    [...pairs(TIMEFRAMES)],
                    String(x)
                )
            )
        ),
        themeSel: theme.transform(
            map((sel) =>
                dropdown(
                    null,
                    { class: "w3 w4-ns", onchange: emitOnStream(theme) },
                    Object.keys(THEMES).map((k) => <DropDownOption>[k, k]),
                    sel.id
                )
            )
        )
    },
    reset: false,
    xform: comp(
        // combines all inputs into a single root component
        map(({ theme, themeSel, chart, symbol, period }) =>
            ["div",
                { class: `sans-serif bg-${theme.bg} ${theme.body}` },
                chart,
                ["div.fixed.f7",
                    { style: { top: `10px`, right: `${MARGIN_X}px` } },
                    ["span.dn.dib-l",
                        ["a",
                            {
                                class: `mr3 b link ${theme.body}`,
                                href: "https://min-api.cryptocompare.com/"
                            },
                            "Data by cyptocompare.com"],
                        ["a",
                            {
                                class: `mr3 b link ${theme.body}`,
                                href: "https://github.com/thi-ng/umbrella/tree/master/examples/crypto-chart/"
                            }, "Source code"]
                    ],
                    symbol,
                    period,
                    themeSel,
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
theme.next("dark");

window.dispatchEvent(new CustomEvent("resize"));
