import { isFunction } from "./is-function.js";

export const hasPerformance = () =>
	typeof performance !== "undefined" && isFunction(performance.now);
