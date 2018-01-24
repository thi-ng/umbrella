import { Transducer } from "../api";
import { map } from "./map";

import { keySelector } from "../func/key-selector";

export function selectKeys<T>(keys: PropertyKey[]): Transducer<T, any> {
    return map(keySelector(keys));
}
