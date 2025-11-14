// SPDX-License-Identifier: Apache-2.0
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { StackContext } from "./api.js";
import { $ } from "./safe.js";

//////////////////// Environment  ////////////////////

/**
 * Pushes current env onto d-stack.
 *
 * Stack effect: `( -- env )`
 *
 * @param ctx -
 * @param env -
 */
export const pushenv = (ctx: StackContext) => (ctx[0].push(ctx[2]), ctx);

/**
 * Loads value for `key` from current env and pushes it on d-stack.
 * Throws error if var doesn't exist.
 *
 * Stack effect: `( key -- env[key] )`
 *
 * @param ctx -
 * @param env -
 */
export const load = (ctx: StackContext) => {
	const stack = ctx[0];
	$(stack, 1);
	const id = stack.pop();
	!ctx[2].hasOwnProperty(id) && illegalArgs(`unknown var: ${id}`);
	stack.push(ctx[2][id]);
	return ctx;
};

/**
 * Stores `val` under `key` in env.
 *
 * Stack effect: `( val key -- )`
 *
 * @param ctx -
 * @param env -
 */
export const store = (ctx: StackContext) => (
	$(ctx[0], 2), (ctx[2][ctx[0].pop()] = ctx[0].pop()), ctx
);

/**
 * Higher order word. Similar to {@link load}, but always uses given
 * preconfigured `key` instead of reading it from d-stack at runtime
 * (also slightly faster). Throws error if var doesn't exist.
 *
 * Stack effect: `( -- env[key] )`
 *
 * @param ctx -
 * @param env -
 */
export const defLoadKey = (key: PropertyKey) => (ctx: StackContext) => {
	!ctx[2].hasOwnProperty(key) &&
		illegalArgs(`unknown var: ${key.toString()}`);
	ctx[0].push(ctx[2][key]);
	return ctx;
};

/**
 * Higher order word. Similar to {@link store}, but always uses given
 * preconfigure `key` instead of reading it from d-stack at runtime
 * (also slightly faster).
 *
 * Stack effect: `( val -- )`
 *
 * @param ctx -
 * @param env -
 */
export const defStoreKey = (key: PropertyKey) => (ctx: StackContext) => {
	$(ctx[0], 1);
	ctx[2][key] = ctx[0].pop();
	return ctx;
};
