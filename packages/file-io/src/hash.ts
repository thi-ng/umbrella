import type { ILogger } from "@thi.ng/logger";
import { createHash } from "crypto";
import { readFileSync } from "fs";

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

export const fileHash = (
	path: string,
	logger?: ILogger,
	algo: HashAlgo = "sha256"
) => {
	const sum = createHash(algo);
	sum.update(readFileSync(path));
	const hash = sum.digest("hex");
	logger && logger.info(`${algo} hash for ${path}: ${hash}`);
	return hash;
};

export const stringHash = (
	src: string,
	logger?: ILogger,
	algo: HashAlgo = "sha256"
) => {
	const sum = createHash(algo);
	sum.update(src);
	const hash = sum.digest("hex");
	logger && logger.info(`${algo} hash for string: ${hash}`);
	return hash;
};
