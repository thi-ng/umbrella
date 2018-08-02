import { Transducer, TransformSpec } from "../api";
import { deepTransform } from "../func/deep-transform";

import { map } from "./map";

/**
 * Transducer. Same as `map(deepTransform(spec))`
 *
 * See `deepTransform()` for details.
 *
 * @param spec
 */
export function mapDeep(spec: TransformSpec): Transducer<any, any> {
    return map(deepTransform(spec));
}
