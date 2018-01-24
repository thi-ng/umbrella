import { Transducer } from "../api";
import { partitionBy } from "./partition-by";

export function partitionOf<T>(sizes: number[]): Transducer<T, T[]> {
    return partitionBy(
        () => {
            let i = 0, j = 0;
            return () => {
                if (i++ === sizes[j]) {
                    i = 1;
                    j = (j + 1) % sizes.length;
                }
                return j;
            };
        }, true);
}
