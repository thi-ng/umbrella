// SPDX-License-Identifier: Apache-2.0
import { defSimplePlotFn } from "./utils.js";

export interface LinePlotOpts {
	attribs: any;
}

export const linePlot = defSimplePlotFn<LinePlotOpts>("polyline");
