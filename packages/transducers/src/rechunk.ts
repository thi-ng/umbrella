import type { Reducer, Transducer } from "./api.js";
import { iterator, __iter } from "./iterator.js";
import { isReduced } from "./reduced.js";

/**
 * Stateful transducer to rechunk/split strings using optional provided regexp
 * (or using `/\r?\n/` (line breaks) by default).
 *
 * @remarks
 * Each incoming string is appended to current buffer string, which is then
 * split using the regexp and re-emitted to as new chunks.
 *
 * One of the main use cases for this transducer is to work in conjunction with
 * NodeJS' stream processing.
 *
 * @example
 * ```ts
 * [...rechunk(/-/, ["abc-d", "ef-g-", "hij", "-k-lm"])]
 * // [ "abc", "def", "g", "hij", "k", "lm" ]
 * ```
 *
 * @example
 * ```ts
 * import { spawn } from "child_process"
 * import { fromNodeJS, trace } from "@thi.ng/rstream";
 *
 * const cmd = spawn("ls", ["-la"]);
 *
 * // (btw. also see linesFromNodeJS() for automatic rechunking)
 * fromNodeJS<string>(cmd.stdout, cmd.stderr)
 *   .transform(rechunk())
 *   .subscribe(trace("output"));
 *
 * // output total 12760
 * // output drwxr-xr-x   37 foo  staff     1184 Nov 15 15:29 .
 * // output drwxr-xr-x  143 foo  staff     4576 Nov 11 21:08 ..
 * // output drwxr-xr-x   17 foo  staff      544 Nov 15 17:39 .git
 * // output -rw-r--r--    1 foo  staff      149 Aug  4 15:32 .gitattributes
 * // output drwxr-xr-x    5 foo  staff      160 Apr 12  2021 .github
 * // output -rw-r--r--    1 foo  staff      659 Sep 10 22:55 .gitignore
 * // ...
 * // output done
 * ```
 *
 * @param re
 */
export function rechunk(re?: RegExp): Transducer<string, string>;
export function rechunk(xs: Iterable<string>): IterableIterator<string>;
export function rechunk(
    re: RegExp,
    xs: Iterable<string>
): IterableIterator<string>;
export function rechunk(...args: any[]) {
    const iter = __iter(rechunk, args, iterator);
    if (iter) return iter;
    return ([init, complete, reduce]: Reducer<any, string>) => {
        let buf = "";
        const re = args[0] || /\r?\n/;
        return [
            init,
            (acc: any) => {
                if (buf) acc = reduce(acc, buf);
                return complete(acc);
            },
            (acc: any, chunk: string) => {
                buf += chunk;
                const res = buf.split(re);
                if (res.length > 1) {
                    buf = res.pop()!;
                    for (let l of res) {
                        acc = reduce(acc, l);
                        if (isReduced(acc)) {
                            buf = "";
                            break;
                        }
                    }
                }
                return acc;
            },
        ];
    };
}
