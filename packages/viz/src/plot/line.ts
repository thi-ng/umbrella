import type { PlotFn } from "../api";
import { processedPoints } from "./utils";

export interface LinePlotOpts {
    attribs: any;
}

export const linePlot = (
    data: Iterable<number[]>,
    opts: Partial<LinePlotOpts> = {}
): PlotFn => (spec) => [
    "polyline",
    opts.attribs || {},
    [...processedPoints(spec, data)],
];
