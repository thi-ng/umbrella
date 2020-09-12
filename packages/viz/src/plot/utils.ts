import type { Fn } from "@thi.ng/api";
import { clamp, inRange } from "@thi.ng/math";
import type { AxisSpec, VizSpec } from "../api";

/** @internal */
export const valueMapper = (
    { scale: scaleX }: AxisSpec,
    { scale: scaleY, domain: [dmin, dmax] }: AxisSpec,
    project: Fn<number[], number[]> = (x) => x
) => ([x, y]: number[]) => project([scaleX(x), scaleY(clamp(y, dmin, dmax))]);

/** @internal */
export function* processedPoints(
    { xaxis, yaxis, project }: VizSpec,
    data: Iterable<number[]>
) {
    const mapper = valueMapper(xaxis, yaxis, project);
    const [dmin, dmax] = xaxis.domain;
    for (let p of data) {
        if (!inRange(p[0], dmin, dmax)) continue;
        yield <[number[], number[]]>[mapper(p), p];
    }
}
