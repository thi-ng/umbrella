import { Transducer } from "../api";
import { mapIndexed } from "./map-indexed";

export function indexed<T>(from = 0): Transducer<T, [number, T]> {
    return mapIndexed((i, x) => [from + i, x]);
}
