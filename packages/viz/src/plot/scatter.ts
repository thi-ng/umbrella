import { defSimplePlotFn } from "./utils";

export interface ScatterPlotOpts {
    attribs: any;
}

export const scatterPlot = defSimplePlotFn<ScatterPlotOpts>("points");
