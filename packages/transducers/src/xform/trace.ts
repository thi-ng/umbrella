import { sideEffect } from "./side-effect";
import type { Transducer } from "../api";

export const trace = <T>(prefix = ""): Transducer<T, T> =>
    sideEffect<T>((x) => console.log(prefix, x));
