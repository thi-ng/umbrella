import type { Fn2, NumOrString } from "@thi.ng/api";
import { map } from "@thi.ng/transducers";
import type { PlotFn } from "../api";
import { valueMapper } from "./utils";

export type Candle = { o: number; h: number; l: number; c: number };

export interface CandlePlotOpts {
    up: Fn2<number, Candle, any>;
    down: Fn2<number, Candle, any>;
    title: Fn2<number, Candle, NumOrString>;
    width: number;
}

export const candlePlot = (
    data: Iterable<[number, { o: number; h: number; l: number; c: number }]>,
    opts: Partial<CandlePlotOpts> = {}
): PlotFn => (spec) => {
    const mapper = valueMapper(spec.xaxis, spec.yaxis, spec.project);
    const w = (opts.width || 6) / 2;
    return [
        "g",
        {},
        ...map(([x, candle]) => {
            const { o, h, l, c } = candle;
            const $o = mapper([x, o]);
            const $c = mapper([x, c]);
            return [
                "g",
                c >= o ? opts.up!(x, candle) : opts.down!(x, candle),
                opts.title ? ["title", {}, opts.title(x, candle)] : null,
                ["line", {}, mapper([x, l]), mapper([x, h])],
                [
                    "polygon",
                    {},
                    [
                        [$o[0] - w, $o[1]],
                        [$c[0] - w, $c[1]],
                        [$c[0] + w, $c[1]],
                        [$o[0] + w, $o[1]],
                    ],
                ],
            ];
        }, data),
    ];
};
