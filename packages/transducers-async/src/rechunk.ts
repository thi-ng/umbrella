// SPDX-License-Identifier: Apache-2.0
import type { MaybeAsyncIterable } from "@thi.ng/api";
import { isReduced } from "@thi.ng/transducers/reduced";
import type { AsyncReducer, AsyncTransducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";

/**
 * Stateful async transducer to rechunk/split strings using optional provided
 * regexp (or using `/\r?\n/` (line breaks) by default).
 *
 * @remarks
 * Each incoming string is appended to the current buffer string, which is then
 * split using the regexp and re-emitted to as new chunks.
 *
 * One of the main use cases for this transducer is to work in conjunction with
 * NodeJS' stream processing.
 *
 * @example
 * ```ts tangle:../export/rechunk.ts
 * import { rechunk } from "@thi.ng/transducers-async";
 * import { spawn } from "child_process";
 *
 * // launch child process
 * const cmd = spawn("ls", ["-l"]);
 *
 * // split child's stdout into single lines
 * for await(let line of rechunk(/\r?\n/g, cmd.stdout)) {
 *   console.log("output", line);
 * }
 * // output total 12760
 * // output drwxr-xr-x   37 foo  staff     1184 Nov 15 15:29 .
 * // output drwxr-xr-x  143 foo  staff     4576 Nov 11 21:08 ..
 * // output drwxr-xr-x   17 foo  staff      544 Nov 15 17:39 .git
 * // output -rw-r--r--    1 foo  staff      149 Aug  4 15:32 .gitattributes
 * // output drwxr-xr-x    5 foo  staff      160 Apr 12  2021 .github
 * // output -rw-r--r--    1 foo  staff      659 Sep 10 22:55 .gitignore
 * // ...
 * ```
 *
 * @param re -
 * @param src -
 */
export function rechunk(re?: RegExp): AsyncTransducer<any, string>;
export function rechunk(
	src: MaybeAsyncIterable<any>
): AsyncIterableIterator<string>;
export function rechunk(
	re: RegExp,
	src: MaybeAsyncIterable<any>
): AsyncIterableIterator<string>;
export function rechunk(...args: any[]) {
	const iter = __iter(rechunk, args, iterator);
	if (iter) return iter;
	return ([init, complete, reduce]: AsyncReducer<string, any>) => {
		let buf = "";
		const re = args[0] || /\r?\n/;
		return [
			init,
			async (acc: any) => {
				if (buf) acc = await reduce(acc, buf);
				return complete(acc);
			},
			async (acc: any, chunk: string) => {
				buf += chunk;
				const parts = buf.split(re);
				if (parts.length > 1) {
					buf = parts.pop()!;
					for (const part of parts) {
						acc = await reduce(acc, part);
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
