import { ensureArray } from "@thi.ng/arrays";
import type { DomainValues, PlotFn } from "../api";
import { processedPoints, valueMapper } from "./utils";

export interface AreaPlotOpts {
    attribs: any;
}

export const areaPlot = (
    data: DomainValues,
    opts: Partial<AreaPlotOpts> = {}
): PlotFn => (spec) => {
    const $data = ensureArray(data);
    const mapper = valueMapper(spec.xaxis, spec.yaxis, spec.project);
    const y0 = spec.yaxis.domain[0];
    return [
        "polygon",
        opts.attribs || {},
        [
            mapper([$data[0][0], y0]),
            ...processedPoints(spec, data, true),
            mapper([$data[$data.length - 1][0], y0]),
        ],
    ];
};
