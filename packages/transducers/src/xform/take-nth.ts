import { Transducer } from "../api";
import { throttle } from "./throttle";

export function takeNth<T>(n: number): Transducer<T, T> {
    n = Math.max(0, n - 1);
    return throttle(
        () => {
            let skip = 0;
            return () => (skip === 0 ? (skip = n, true) : (skip-- , false));
        }
    );
}
