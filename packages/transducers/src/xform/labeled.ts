import { Transducer } from "../api";
import { map } from "./map";

export function labeled<L, T>(id: L): Transducer<T, [L, T]> {
    return map((x) => [id, x]);
}
