import { Transducer } from "../api";
import { sideEffect } from "./side-effect";

export function inspect<T>(prefix: string = ""): Transducer<T, T> {
    return sideEffect<T>((x) => console.log(prefix, x));
}
