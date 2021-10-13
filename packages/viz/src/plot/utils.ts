import type { Fn } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { clamp, inRange } from "@thi.ng/math/interval";
import type { AxisSpec, DomainValues, PlotFn, VizSpec } from "../api.js";

/** @internal */
export const valueMapper =
    (
        { scale: scaleX }: AxisSpec,
        { scale: scaleY, domain: [dmin, dmax] }: AxisSpec,
        project: Fn<number[], number[]> = (x) => x
    ) =>
    ([x, y]: number[]) =>
        project([scaleX(x), scaleY(clamp(y, dmin, dmax))]);

/** @internal */
export function processedPoints(
    { xaxis, yaxis, project }: VizSpec,
    data: DomainValues
): IterableIterator<[number[], number[]]>;
export function processedPoints(
    { xaxis, yaxis, project }: VizSpec,
    data: DomainValues,
    pointsOnly: true
): IterableIterator<number[]>;
export function* processedPoints(
    { xaxis, yaxis, project }: VizSpec,
    data: DomainValues,
    pointOnly = false
): IterableIterator<any> {
    const mapper = valueMapper(xaxis, yaxis, project);
    const [dmin, dmax] = xaxis.domain;
    for (let p of isFunction(data) ? data(xaxis.domain) : data) {
        if (!inRange(p[0], dmin, dmax)) continue;
        yield pointOnly ? mapper(p) : [mapper(p), p];
    }
}

/**
 * Returns a simple {@link PlotFn} which uses a single `shape` element and
 * produces its points via {@link processedPoints}.
 *
 * @param shape -
 *
 * @internal
 */
export const defSimplePlotFn =
    <T extends { attribs: any }>(shape: string) =>
    (data: DomainValues, opts: Partial<T> = {}): PlotFn =>
    (spec) =>
        [shape, opts.attribs || {}, [...processedPoints(spec, data, true)]];
