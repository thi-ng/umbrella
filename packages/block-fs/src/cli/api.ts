// SPDX-License-Identifier: Apache-2.0
import { int, type CommandCtx } from "@thi.ng/args";
import { isPow2 } from "@thi.ng/binary";
import { illegalArgs } from "@thi.ng/errors";

export interface CLIOpts {
	verbose: boolean;
	quiet: boolean;
}

export const ARG_BLOCKSIZE = {
	blockSize: int({
		alias: "bs",
		desc: "Block size",
		hint: "BYTES",
		default: 1024,
		coerce: (x: string) => {
			const size = +x;
			if (!isPow2(size)) illegalArgs("block size must be a power of 2");
			return size;
		},
	}),
};

export interface AppCtx<T extends CLIOpts> extends CommandCtx<T, CLIOpts> {}
