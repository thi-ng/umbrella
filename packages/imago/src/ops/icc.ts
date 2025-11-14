// SPDX-License-Identifier: Apache-2.0
import { illegalArgs } from "@thi.ng/errors";
import { resolve } from "node:path";
import type { Processor, ICCSpec } from "../api.js";

export const iccProc: Processor = async (opts, src, ctx) => {
	const $opts = <ICCSpec>opts;
	if ($opts.profile) {
		ctx.logger.info("setting ICC profile:", $opts.profile);
		return [src.withIccProfile($opts.profile), false];
	} else if ($opts.path) {
		ctx.logger.info("setting ICC profile:", $opts.path);
		ctx.opts.keepICC = false;
		return [src.withIccProfile(resolve($opts.path)), false];
	}
	illegalArgs("require ICC profile name or path");
};
