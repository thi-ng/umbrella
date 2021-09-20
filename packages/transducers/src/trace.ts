import type { Transducer } from "./api";
import { sideEffect } from "./side-effect";

export const trace = <T>(prefix = ""): Transducer<T, T> =>
    sideEffect<T>((x) => console.log(prefix, x));
