// SPDX-License-Identifier: Apache-2.0
import type { StackContext } from "./api.js";
import { $n, $ } from "./safe.js";

/**
 * Takes a string and stringified regexp (w/o flags), returns true if
 * regexp matches the string.
 *
 * Stack effect: `( str re -- bool )`
 *
 * @param ctx -
 */
export const ismatch = (ctx: StackContext) => {
	const stack = ctx[0];
	const n = stack.length - 2;
	$n(n, 0);
	stack[n] = new RegExp(stack[n + 1]).test(stack[n]);
	stack.length--;
	return ctx;
};

/**
 * Stack effect: `( str -- obj )`
 *
 * @param ctx -
 */
export const fromjson = (ctx: StackContext) => {
	const stack = ctx[0];
	$(stack, 1);
	stack.push(JSON.parse(stack.pop()));
	return ctx;
};

/**
 * Stack effect: `( x -- str )`
 *
 * @param ctx -
 */
export const tojson = (ctx: StackContext) => {
	const stack = ctx[0];
	$(stack, 1);
	stack.push(JSON.stringify(stack.pop(), null, 4));
	return ctx;
};
