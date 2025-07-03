// SPDX-License-Identifier: Apache-2.0
import type { TypedArray } from "@thi.ng/api";
import type { ILogger } from "@thi.ng/logger";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import type { Readable } from "node:stream";
import { maskedPath } from "./mask.js";

export type HashAlgo =
	| "gost-mac"
	| "md4"
	| "md5"
	| "md_gost94"
	| "ripemd160"
	| "sha1"
	| "sha224"
	| "sha256"
	| "sha384"
	| "sha512"
	| "streebog256"
	| "streebog512"
	| "whirlpool";

/**
 * Creates a readable stream for given file and computes its hash digest using
 * {@link streamHash}.
 *
 * @param path
 * @param logger
 * @param algo
 */
export const fileHash = async (
	path: string,
	logger?: ILogger,
	algo: HashAlgo = "sha256"
) => {
	logger?.info("reading file:", maskedPath(path));
	return await streamHash(createReadStream(path), logger, algo);
};

/**
 * Computes hash digest from given stream using chosen hash algorithm (default:
 * "sha256"). If `logger` is given, the hash will be logged too.
 *
 * @remarks
 * Also see {@link fileHash} and {@link bufferHash}.
 *
 * @param src
 * @param logger
 * @param algo
 */
export const streamHash = async (
	src: Readable,
	logger?: ILogger,
	algo: HashAlgo = "sha256"
) => {
	const sum = createHash(algo);
	for await (let chunk of src) sum.update(chunk);
	const hash = sum.digest("hex");
	logger?.info(`${algo} hash: ${hash}`);
	return hash;
};

/**
 * Computes hash digest from given string or buffer using chosen hash algorithm
 * (default: "sha256"). If `logger` is given, the hash will be logged too.
 *
 * @param src
 * @param logger
 * @param algo
 */
export const bufferHash = (
	src: TypedArray | Buffer | DataView | string,
	logger?: ILogger,
	algo: HashAlgo = "sha256"
) => {
	const hash = createHash(algo).update(src).digest("hex");
	logger?.info(`${algo} hash: ${hash}`);
	return hash;
};
