import { Transducer } from "../api";
import { sideEffect } from "./side-effect";

export function trace<T>(prefix = ""): Transducer<T, T> {
    return sideEffect<T>((x) => console.log(prefix, x));
}
