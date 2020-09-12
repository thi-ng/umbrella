import { ensureArray } from "@thi.ng/arrays";
import { map } from "@thi.ng/transducers";
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
    const mapper = valueMapper(spec.xaxis, spec.yaxis, spec.project);
    const y0 = spec.yaxis.domain[0];
    return [
        "polygon",
        opts.attribs || {},
        [
            mapper([$data[0][0], y0]),
            ...map((p) => p[0], processedPoints(spec, data)),
            mapper([$data[$data.length - 1][0], y0]),
        ],
    ];
};
