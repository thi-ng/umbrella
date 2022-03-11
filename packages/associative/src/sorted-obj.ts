import type { IObjectOf } from "@thi.ng/api";
import { compareByKey } from "@thi.ng/compare/keys";
import { assocObj } from "@thi.ng/transducers/assoc-obj";

/**
 * Takes an object and returns shallow copy with keys sorted. Useful for JSON
 * serialization/pretty printing.
 *
 * @remarks
 * Note: Object keys are not guaranteed to keep their order and behavior will
 * depend on JS runtime and object size (number of keys).
 *
 * @param obj - 
 */
export const sortedObject = (obj: IObjectOf<any>) =>
    assocObj(Object.entries(obj).sort(compareByKey(0)));
