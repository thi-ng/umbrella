import { clearDOM, renderOnce } from "@thi.ng/hdom";
import { fit } from "@thi.ng/math";
import { map, mapcat, range } from "@thi.ng/transducers";

// iterator of range mapped tuples: `[mapped, orig]`
const mappedRange = (
    from: number,
    to: number,
    step: number,
    start: number,
    end: number
) => map((n) => [fit(n, from, to, start, end), n], range(from, to, step));

// syntax sugar to create SVG line
const line = (x1: number, y1: number, x2: number, y2: number) => [
    "line",
    { x1, y1, x2, y2 },
];

// reusuable axis tick & label combo
const tick = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    tx: number,
    ty: number,
    label: string
) => [line(x1, y1, x2, y2), ["text", { x: tx, y: ty, stroke: "none" }, label]];

// mapping fn for x-axis ticks
const tickX = (y: number) => ([x, n]: any) =>
    tick(x, y, x, y + 10, x, y + 20, n);

// mapping fn for y-axis ticks
const tickY = (x: number) => ([y, n]: any) =>
    tick(x - 10, y, x, y, x - 15, y, n);

// x-axis with ticks as SVG group
const axisX = ({ axis: a, domain: d, range: r }: any) => [
    "g",
    { "text-anchor": "middle" },
    line(a[0], a[2], a[1], a[2]),
    mapcat(tickX(a[2]), mappedRange(d[0], d[1], d[2], r[0], r[1])),
];

// y-axis with ticks as SVG group
const axisY = ({ axis: a, domain: d, range: r }: any) => [
    "g",
    { "text-anchor": "end" },
    line(a[2], a[0], a[2], a[1]),
    mapcat(tickY(a[2]), mappedRange(d[0], d[1], d[2], r[0], r[1])),
];

// mapping fn to create a single bar from `[domainPos, value]`
const bar = (
    { domain: xd, range: xr }: any,
    { domain: yd, range: yr }: any
) => ([xx, yy]: number[]) => {
    const y = fit(yy, yd[0], yd[1], yr[0], yr[1]);
    return [
        "rect",
        {
            x: fit(xx, xd[0], xd[1], xr[0], xr[1]) - 5,
            y,
            width: 10,
            height: yr[0] - y,
        },
    ];
};

// complete bar chart component
const barChart = (_: any, opts: any, values: any) => [
    "svg",
    opts.attribs,
    ["g", { stroke: opts.axis, fill: opts.axis }, axisX(opts.x), axisY(opts.y)],
    ["g", { fill: opts.fill }, map(bar(opts.x, opts.y), values)],
];

// one-off DOM creation
renderOnce([
    "div.ma2.sans-serif",
    ["h1", "Bar chart example"],
    [
        barChart,
        {
            attribs: {
                width: 500,
                height: 200,
                "font-size": "10px",
                "font-family": "Menlo, sans-serif",
            },
            x: {
                axis: [40, 490, 170],
                domain: [1980, 2021, 10],
                range: [60, 480],
            },
            y: {
                axis: [170, 10, 40],
                domain: [0, 101, 25],
                range: [160, 20],
            },
            axis: "#666",
            fill: "#0cc",
        },
        map((year) => [year, Math.random() * 100], range(1980, 2020, 2)),
    ],
]);

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => clearDOM(document.getElementById("app")!));
}
