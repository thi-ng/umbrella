// SPDX-License-Identifier: Apache-2.0
import { isFunction } from "./is-function.js";

export const hasPerformance = () =>
	typeof performance !== "undefined" && isFunction(performance.now);
