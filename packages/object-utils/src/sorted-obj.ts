import type { IObjectOf } from "@thi.ng/api";
import { asObject } from "./as-object.js";

/**
 * Takes an object and returns shallow copy with keys sorted. Useful for JSON
 * serialization/pretty printing.
 *
 * @param obj -
 */
export const sortedObject = (obj: IObjectOf<any>) =>
	asObject(
		Object.entries(obj).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
	);
