import type { Transducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";
import { partitionBy } from "./partition-by.js";

export interface WordWrapOpts {
    delim: number;
    always: boolean;
}

/**
 * Returns transducer partitioning words into variable sized arrays
 * based on given `lineLength` (default 80).
 *
 * @remarks
 * The optional `delim` and `always` args can be used to adjust the
 * length and usage of delimiters between each word. If `always` is
 * true, the delimiter length is added to each word, even near line
 * endings. If false (default), the last word on each line can still fit
 * even if there's no space for the delimiter.
 *
 * @param lineLength -
 * @param opts -
 * @param src -
 */
export function wordWrap(
    lineLength: number,
    opts?: Partial<WordWrapOpts>
): Transducer<string, string[]>;
export function wordWrap(
    lineLength: number,
    src: Iterable<string>
): IterableIterator<string[]>;
export function wordWrap(
    lineLength: number,
    opts: Partial<WordWrapOpts>,
    src: Iterable<string>
): IterableIterator<string[]>;
export function wordWrap(...args: any[]): any {
    const iter = __iter(wordWrap, args, iterator);
    if (iter) {
        return iter;
    }
    const lineLength = args[0];
    const { delim, always } = <WordWrapOpts>{
        delim: 1,
        always: true,
        ...args[1],
    };
    return partitionBy(() => {
        let n = 0;
        let flag = false;
        return (w: string) => {
            n += w.length + delim;
            if (n > lineLength + (always ? 0 : delim)) {
                flag = !flag;
                n = w.length + delim;
            }
            return flag;
        };
    }, true);
}
