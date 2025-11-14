// SPDX-License-Identifier: Apache-2.0
import type { Parser } from "../api.js";
import { parseError } from "../error.js";

export const expect =
	<T>(parser: Parser<T>, err: string): Parser<T> =>
	(ctx) =>
		parser(ctx) || parseError(ctx, err);
