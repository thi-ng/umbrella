import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { compL } from "@thi.ng/compose/comp";
import type {
	StackContext,
	StackEnv,
	StackFn,
	StackProc,
	StackProgram,
} from "./api.js";
import { $ } from "./safe.js";
import { tos } from "./stack.js";

export const $stackFn = (f: StackProc) => (isArray(f) ? defWord(f) : f);

const compile = (prog: StackProgram) =>
	prog.length > 0
		? compL.apply(
				null,
				<any>(
					prog.map((w) =>
						!isFunction(w)
							? (ctx: StackContext) => (ctx[0].push(w), ctx)
							: w
					)
				)
		  )
		: (ctx: StackContext) => ctx;

/**
 * Takes a result tuple returned by {@link run} and unwraps one or more
 * items from result stack. If no `n` is given, defaults to single value
 * (TOS) and returns it as is. Returns an array for all other `n`.
 *
 * @param result -
 * @param n -
 */
export const unwrap = ([stack]: StackContext, n = 1) =>
	n === 1 ? tos(stack) : stack.slice(Math.max(0, stack.length - n));

//////////////////// Dynamic words & quotations  ////////////////////

/**
 * Higher order word. Takes a StackProgram and returns it as StackFn to
 * be used like any word. Unknown stack effect.
 *
 * If the optional `env` is given, uses a shallow copy of that
 * environment (one per invocation) instead of the current one passed by
 * {@link run} at runtime. If `mergeEnv` is true (default), the user
 * provided env will be merged with the current env (also shallow
 * copies). This is useful in conjunction with {@link pushenv} and {@link store}
 * or `storekey()` to save results of sub procedures in the main env.
 *
 * Note: The provided (or merged) env is only active within the
 * execution scope of the word.
 *
 * ( ? -- ? )
 *
 * @param prog -
 * @param env -
 * @param mergeEnv -
 */
export const defWord = (
	prog: StackProgram,
	env?: StackEnv,
	mergeEnv = true
) => {
	const w: StackFn = compile(prog);
	return env
		? mergeEnv
			? (ctx: StackContext) => (
					w([ctx[0], ctx[1], { ...ctx[2], ...env }]), ctx
			  )
			: (ctx: StackContext) => (w([ctx[0], ctx[1], { ...env }]), ctx)
		: w;
};

/**
 * Like {@link word}, but automatically calls {@link unwrap} on result context
 * to produced unwrapped value/tuple.
 *
 * **Importatant:** Words defined with this function CANNOT be used as
 * part of a larger stack program, only for standalone use.
 *
 * @param prog -
 * @param n -
 * @param env -
 * @param mergeEnv -
 */
export const defWordU = (
	prog: StackProgram,
	n = 1,
	env?: StackEnv,
	mergeEnv = true
) => {
	const w: StackFn = compile(prog);
	return env
		? mergeEnv
			? (ctx: StackContext) =>
					unwrap(w([ctx[0], ctx[1], { ...ctx[2], ...env }]), n)
			: (ctx: StackContext) => unwrap(w([ctx[0], ctx[1], { ...env }]), n)
		: (ctx: StackContext) => unwrap(w(ctx), n);
};

/**
 * Executes TOS as stack function and places result back on d-stack. TOS
 * MUST be a valid word or quotation.
 *
 * ( x -- x() )
 *
 * @param ctx -
 */
export const exec = (ctx: StackContext) => (
	$(ctx[0], 1), $stackFn(ctx[0].pop())(ctx)
);

/**
 * Expects a body and error handler quotation on stack. Executes body
 * within an implicit `try .. catch` and if an error was thrown pushes
 * it on stack and executes error quotation.
 *
 * ( body catch -- ? )
 *
 * @param ctx -
 */
export const $try = (ctx: StackContext) => {
	const stack = ctx[0];
	$(stack, 2);
	const err = stack.pop();
	try {
		return exec(ctx);
	} catch (e) {
		stack.push(e, err);
		return exec(ctx);
	}
};

//////////////////// JS host calls ////////////////////

/**
 * Expects TOS to be a quotation with a vanilla JS function as first
 * element. Calls fn with all remaining items in quot as arguments and
 * pushes result back on d-stack (even if fn returned `undefined`).
 *
 * ( [f ...] -- f(...) )
 *
 * @param ctx -
 */
export const execjs = (ctx: StackContext) => {
	const stack = ctx[0];
	$(stack, 1);
	const [fn, ...args] = stack.pop();
	stack.push(fn(...args));
	return ctx;
};
