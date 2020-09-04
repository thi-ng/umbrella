import { ensureArray } from "@thi.ng/arrays";
import type { PlotFn } from "../api";
import { processedPoints, valueMapper } from "./utils";

export interface AreaPlotOpts {
    attribs: any;
}

export const areaPlot = (
    data: Iterable<number[]>,
    opts: Partial<AreaPlotOpts> = {}
): PlotFn => (spec) => {
    const $data = ensureArray(data);
    const map = valueMapper(spec.xaxis, spec.yaxis, spec.project);
    const y0 = spec.yaxis.domain[0];
    return [
        "polygon",
        opts.attribs || {},
        [
            map([$data[0][0], y0]),
            ...processedPoints(spec, data),
            map([$data[$data.length - 1][0], y0]),
        ],
    ];
};
