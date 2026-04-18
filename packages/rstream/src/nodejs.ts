// SPDX-License-Identifier: Apache-2.0
import { rechunk } from "@thi.ng/transducers/rechunk";
import type { Readable } from "node:stream";
import type { ISubscriber, ISubscription } from "./api.js";
import { stream } from "./stream.js";

/**
 * Adapter bridge from NodeJS streams. Pipes data from given `stdout` (assumed
 * to produce data of type `T`) into `ingest` or creates and returns a new
 * {@link stream}. If given, also connects given `stderr` to `ingest`'s error
 * handler (if defined). Unless `close` is false, `ingest` closes once `stdout` is closed.
 *
 * @param stdout -
 * @param stderr -
 * @param close -
 * @param ingest -
 */
export const fromNodeJS = <T>(
	stdout: Readable,
	stderr?: Readable,
	close = true,
	ingest: ISubscriber<T> = stream<T>()
): ISubscriber<T> => {
	stdout.on("data", (data) => ingest.next(data));
	if (stderr && ingest.error)
		stderr.on("data", (data) => ingest.error!(data));
	if (close && ingest.done) stdout.on("close", () => ingest.done!());
	return ingest;
};

/**
 * Specialized version of {@link fromNodeJS} for string inputs and automatic
 * rechunking/splitting of the input using the optionally provided regexp (line
 * breaks by default).
 *
 * @remarks
 * Internally uses
 * https://docs.thi.ng/umbrella/transducers/functions/rechunk.html to rechunk
 * input.
 *
 * @example
 * ```ts tangle:../export/lines-from-nodejs.ts
 * import { linesFromNodeJS, trace } from "@thi.ng/rstream";
 * import { spawn } from "node:child_process"
 *
 * const cmd = spawn("ls", ["-la"]);
 *
 * linesFromNodeJS(cmd.stdout, cmd.stderr).subscribe(trace("output"));
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
 * @param ingest -
 */
export const linesFromNodeJS = (
	stdout: Readable,
	stderr?: Readable,
	re?: RegExp,
	close?: boolean,
	ingest?: ISubscription<string, string>
) =>
	<ISubscription<string, string>>(
		fromNodeJS<string>(stdout, stderr, close, ingest).transform(rechunk(re))
	);
