import type { DomainValues, PlotFn } from "../api";
import { processedPoints } from "./utils";

export interface ScatterPlotOpts {
    attribs: any;
}

export const scatterPlot = (
    data: DomainValues,
    opts: Partial<ScatterPlotOpts> = {}
): PlotFn => (spec) => [
    "points",
    opts.attribs || {},
    [...processedPoints(spec, data, true)],
];
