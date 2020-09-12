import type { Fn } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import { clamp, inRange } from "@thi.ng/math";
import type { AxisSpec, DomainValues, VizSpec } from "../api";

/** @internal */
export const valueMapper = (
    { scale: scaleX }: AxisSpec,
    { scale: scaleY, domain: [dmin, dmax] }: AxisSpec,
    project: Fn<number[], number[]> = (x) => x
) => ([x, y]: number[]) => project([scaleX(x), scaleY(clamp(y, dmin, dmax))]);

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
