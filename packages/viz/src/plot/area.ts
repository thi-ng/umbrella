// SPDX-License-Identifier: Apache-2.0
import { ensureArray } from "@thi.ng/arrays/ensure-array";
import type { DomainValues, PlotFn } from "../api.js";
import { __resolveData, processedPoints, __valueMapper } from "./utils.js";

export interface AreaPlotOpts {
	attribs: any;
}

export const areaPlot =
	(data: DomainValues, opts: Partial<AreaPlotOpts> = {}): PlotFn =>
	(spec) => {
		const $data = ensureArray(__resolveData(data, spec.xaxis.domain));
		const mapper = __valueMapper(spec.xaxis, spec.yaxis, spec.project);
		const y0 = spec.yaxis.domain[0];
		return [
			"polygon",
			opts.attribs || {},
			[
				mapper([$data[0][0], y0]),
				...processedPoints(spec, $data, true),
				mapper([$data[$data.length - 1][0], y0]),
			],
		];
	};
