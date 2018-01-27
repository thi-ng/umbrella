import { Transducer } from "../api";
import { throttle } from "./throttle";

export function dropNth<T>(n: number): Transducer<T, T> {
    n = Math.max(0, n - 1);
    return throttle(
        () => {
            let skip = n;
            return () => skip-- > 0 ? true : (skip = n, false);
        }
    );
}
