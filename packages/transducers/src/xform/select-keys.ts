import { Transducer } from "../api";
import { keySelector } from "../func/key-selector";

import { map } from "./map";

export function selectKeys<T>(keys: PropertyKey[]): Transducer<T, any> {
    return map(keySelector(keys));
}
