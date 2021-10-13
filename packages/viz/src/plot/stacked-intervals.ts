import type { Fn, Fn2 } from "@thi.ng/api";
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import { iterator } from "@thi.ng/transducers/iterator";
import { map } from "@thi.ng/transducers/map";
import { mapcatIndexed } from "@thi.ng/transducers/mapcat-indexed";
import { push } from "@thi.ng/transducers/push";
import { some } from "@thi.ng/transducers/some";
import { transduce } from "@thi.ng/transducers/transduce";
import type { Domain, PlotFn } from "../api.js";
import { valueMapper } from "./utils.js";

export interface StackedIntervalOpts<T> {
    attribs?: any;
    interval: Fn<T, number[]>;
    overlap: number;
    sort?: Fn2<[number[], T], [number[], T], number>;
    shape: Fn2<[number[], number[], T, number], Fn<number[], number[]>, any>;
}

type Row<T> = [number[], T][];

const overlap = ([a, b]: number[], [c, d]: number[], pad = 0) =>
    a <= d + pad && b + pad >= c;

const rowStacking = <T>(data: [number[], T][], pad = 0) =>
    data.reduce((acc, item) => {
        const rx = item[0];
        for (let i = 0; true; i++) {
            const row = acc[i];
            if (!row || !some((y) => overlap(rx, y[0], pad), row)) {
                row ? row.push(item) : (acc[i] = [item]);
                return acc;
            }
        }
    }, <Row<T>[]>[]);

const processRow =
    <T>(mapper: Fn<number[], number[]>, [d1, d2]: Domain) =>
    (i: number, row: Row<T>) =>
        map(
            ([[a, b], item]) =>
                <[number[], number[], T, number]>[
                    mapper([Math.max(d1, a), i]),
                    mapper([Math.min(d2, b), i]),
                    item,
                    i,
                ],
            row
        );

export const stackedIntervals =
    <T>(data: T[], opts: StackedIntervalOpts<T>): PlotFn =>
    (spec) => {
        const mapper = valueMapper(spec.xaxis, spec.yaxis, spec.project);
        const domain = spec.xaxis.domain;
        return [
            "g",
            opts.attribs,
            ...iterator(
                comp(
                    mapcatIndexed(processRow<T>(mapper, domain)),
                    map((x) => opts.shape(x, mapper))
                ),
                rowStacking(
                    transduce(
                        comp(
                            map((x) => <[number[], T]>[opts.interval(x), x]),
                            filter(([x]) => overlap(domain, x, opts.overlap))
                        ),
                        push<[number[], T]>(),
                        data
                    ).sort(opts.sort || ((a, b) => a[0][0] - b[0][0])),
                    opts.overlap
                )
            ),
        ];
    };
