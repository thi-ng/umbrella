import { defSimplePlotFn } from "./utils.js";

export interface ScatterPlotOpts {
	attribs: any;
}

export const scatterPlot = defSimplePlotFn<ScatterPlotOpts>("points");
