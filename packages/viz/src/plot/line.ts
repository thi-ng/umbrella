import { defSimplePlotFn } from "./utils";

export interface LinePlotOpts {
    attribs: any;
}

export const linePlot = defSimplePlotFn<LinePlotOpts>("polyline");
