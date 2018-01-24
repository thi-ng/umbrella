import { Transducer } from "../api";
import { map } from "./map";

export function pluck<A, B>(key: PropertyKey): Transducer<A, B> {
    return map((x: A) => x[key]);
}
