import { rechunk } from "@thi.ng/transducers/rechunk";
import type { Readable } from "stream";
import { Stream, stream } from "./stream.js";
import type { Subscription } from "./subscription.js";

/**
 * Adapter bridge from NodeJS streams. Creates and returns a new {@link stream}
 * of type `T` and pipes in data from `stdout` (also assumed to produce data of
 * type `T`). If given, also connects `stderr` to new rstream's error handler.
 * Unless `close` is false, the new stream closes once `stdout` is closed.
 *
 * @param stdout - 
 * @param stderr - 
 * @param close - 
 */
export const fromNodeJS = <T>(
    stdout: Readable,
    stderr?: Readable,
    close = true
): Stream<T> => {
    const ingest = stream<T>();
    stdout.on("data", (data) => ingest.next(data));
    stderr && stderr.on("data", (data) => ingest.error(data));
    close && stdout.on("close", () => ingest.done());
    return ingest;
};

/**
 * Specialized version of {@link fromNodeJS} for string inputs and automatic
 * rechunking/splitting of the input using the optionally provided regexp (line
 * breaks by default).
 *
 * @remarks
 * Internally uses https://docs.thi.ng/umbrella/transducers/modules.html#rechunk
 * to rechunk input.
 *
 * @example
 * ```ts
 * import { spawn } from "child_process"
 * import { linesFromNodeJS, trace } from "@thi.ng/rstream";
 *
 * const cmd = spawn("ls", ["-la"]);
 *
 * linesFromNodeJS<string>(cmd.stdout, cmd.stderr).subscribe(trace("output"));
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
 * @param stdout - 
 * @param stderr - 
 * @param re - 
 * @param close - 
 */
export const linesFromNodeJS = (
    stdout: Readable,
    stderr?: Readable,
    re?: RegExp,
    close?: boolean
) =>
    <Subscription<string, string>>(
        fromNodeJS<string>(stdout, stderr, close).transform(rechunk(re))
    );
