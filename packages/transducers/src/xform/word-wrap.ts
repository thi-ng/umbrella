import { Transducer } from "../api";
import { partitionBy } from "./partition-by";

/**
 * Returns transducer partitioning words into variable sized arrays
 * based on given `lineLength` (default 80). The optional `delim` and
 * `alwaysDelim` args can be used to adjust the length and usage of
 * delimiters between each word. If `alwaysDelim` is true, the delimiter
 * length is added to each word, even near line endings. If false
 * (default), the last word on each line can still fit even if there's
 * no space for the delimiter.
 *
 * @param lineLength
 * @param delim
 * @param alwaysDelim
 */
export function wordWrap(lineLength = 80, delim = 1, alwaysDelim = false): Transducer<string, string[]> {
    return partitionBy(
        () => {
            let n = 0;
            let flag = false;
            return (w: string) => {
                n += w.length + delim;
                if (n > lineLength + (alwaysDelim ? 0 : delim)) {
                    flag = !flag;
                    n = w.length + delim;
                }
                return flag;
            };
        }, true);
}
