import { Transducer, TransformSpec } from "../api";
import { deepTransform } from "../func/deep-transform";

import { map } from "./map";

/**
 * Same as `map(deepTransform(spec))`
 *
 * @param spec
 */
export function mapDeep(spec: TransformSpec): Transducer<any, any> {
    return map(deepTransform(spec));
}
