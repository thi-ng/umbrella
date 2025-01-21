// SPDX-License-Identifier: Apache-2.0
import { Lane } from "../api.js";
import { defFloatFormat } from "./float-format.js";

export const FLOAT_RGB = defFloatFormat({
	channels: [Lane.RED, Lane.GREEN, Lane.BLUE],
});
