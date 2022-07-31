import type { Stack, StackContext } from "./api.js";
import { $, $n } from "./safe.js";

const __xsp = (id: 0 | 1) => (ctx: StackContext) => (
	ctx[0].push(ctx[id].length), ctx
);

const __dup = (id: 0 | 1) => __copy(id, id);

const __dup2 = (id: 0 | 1) => (ctx: StackContext) => {
	const stack = ctx[id];
	let n = stack.length - 2;
	$n(n, 0);
	stack.push(stack[n], stack[n + 1]);
	return ctx;
};

const __dup3 = (id: 0 | 1) => (ctx: StackContext) => {
	const stack = ctx[id];
	let n = stack.length - 3;
	$n(n, 0);
	stack.push(stack[n], stack[n + 1], stack[n + 2]);
	return ctx;
};

const __drop =
	(id: 0 | 1, n = 1) =>
	(ctx: StackContext) => ($(ctx[id], 1), (ctx[id].length -= n), ctx);

const __swap = (i: number) => (ctx: StackContext) => {
	const stack = ctx[i];
	const n = stack.length - 2;
	$n(n, 0);
	const a = stack[n];
	stack[n] = stack[n + 1];
	stack[n + 1] = a;
	return ctx;
};

const __swap2 = (i: number) => (ctx: StackContext) => {
	const stack = ctx[i];
	let n = stack.length - 1;
	$n(n, 3);
	let a = stack[n];
	stack[n] = stack[n - 2];
	stack[n - 2] = a;
	n--;
	a = stack[n];
	stack[n] = stack[n - 2];
	stack[n - 2] = a;
	return ctx;
};

const __over = (id: 0 | 1) => (ctx: StackContext) => {
	const stack = ctx[id];
	const n = stack.length - 2;
	$n(n, 0);
	stack.push(stack[n]);
	return ctx;
};

const __move = (src: 0 | 1, dest: 0 | 1) => (ctx: StackContext) => (
	$(ctx[src], 1), ctx[dest].push(ctx[src].pop()), ctx
);

const __move2 = (a: 0 | 1, b: 0 | 1) => (ctx: StackContext) => {
	const src = ctx[a];
	$(src, 2);
	const v = src.pop();
	ctx[b].push(src.pop(), v);
	return ctx;
};

const __copy = (src: 0 | 1, dest: 0 | 1) => (ctx: StackContext) => (
	$(ctx[src], 1), ctx[dest].push(tos(ctx[src])), ctx
);

const __copy2 = (a: 0 | 1, b: 0 | 1) => (ctx: StackContext) => {
	const src = ctx[a];
	const n = src.length - 2;
	$n(n, 0);
	ctx[b].push(src[n], src[n + 1]);
	return ctx;
};

const __incdec = (id: 0 | 1, n: number) => (ctx: StackContext) => (
	$(ctx[id], 1), (ctx[id][ctx[id].length - 1] += n), ctx
);

//////////////////// Stack manipulation words ////////////////////

/**
 * Returns top of stack value (always unsafe, no underflow checking).
 *
 * @param stack -
 */
export const tos = (stack: Stack) => stack[stack.length - 1];

/**
 * Utility word w/ no stack nor side effect.
 */
export const nop = (ctx: StackContext) => ctx;

/**
 * Pushes current d-stack size on d-stack.
 *
 * ( -- n )
 * @param ctx -
 */
export const dsp = __xsp(0);

/**
 * Uses TOS as index to look up a deeper d-stack value, then places it
 * as new TOS. Throws error if stack depth is < `x`.
 *
 * ( ... x -- ... stack[x] )
 *
 * @param ctx -
 */
export const pick = (ctx: StackContext) => {
	const stack = ctx[0];
	let n = stack.length - 1;
	$n(n, 0);
	$n((n -= stack.pop() + 1), 0);
	stack.push(stack[n]);
	return ctx;
};

/**
 * Removes TOS from d-stack.
 *
 * ( x -- )
 *
 * @param ctx -
 */
export const drop = __drop(0);

/**
 * Removes top 2 vals from d-stack.
 *
 * ( x y -- )
 *
 * @param ctx -
 */
export const drop2 = __drop(0, 2);

/**
 * If TOS is truthy then drop it:
 *
 * ( x -- )
 *
 * Else, no effect:
 *
 * ( x -- x )
 */
export const dropif = (ctx: StackContext) => (
	$(ctx[0], 1), tos(ctx[0]) && ctx[0].length--, ctx
);

/**
 * Higher order word. Pushes given args verbatim on d-stack.
 *
 * ( -- ...args )
 *
 * @param args -
 */
export const defPush =
	(...args: any[]) =>
	(ctx: StackContext) => (ctx[0].push(...args), ctx);

/**
 * Duplicates TOS on d-stack.
 *
 * ( x -- x x )
 *
 * @param ctx -
 */
export const dup = __dup(0);

/**
 * Duplicates top 2 vals on d-stack.
 *
 * ( x y -- x y x y )
 *
 * @param ctx -
 */
export const dup2 = __dup2(0);

/**
 * Duplicates top 3 vals on d-stack.
 *
 * ( x y -- x y x y )
 *
 * @param ctx -
 */
export const dup3 = __dup3(0);

/**
 * If TOS is truthy then push copy of it on d-stack:
 *
 * ( x -- x x )
 *
 * Else, no effect:
 *
 * ( x -- x )
 *
 * @param ctx -
 */
export const dupif = (ctx: StackContext) => {
	$(ctx[0], 1);
	const x = tos(ctx[0]);
	x && ctx[0].push(x);
	return ctx;
};

/**
 * Swaps the two topmost d-stack items.
 *
 * ( x y -- y x )
 *
 * @param ctx -
 */
export const swap = __swap(0);

/**
 * Swaps the two topmost d-stack pairs.
 *
 * ( a b c d -- c d a b )
 *
 * @param ctx -
 */
export const swap2 = __swap2(0);

/**
 * Removes second topmost item from d-stack.
 *
 * ( x y -- y )
 *
 * @param ctx -
 */
export const nip = (ctx: StackContext) => {
	const stack = ctx[0];
	const n = stack.length - 2;
	$n(n, 0);
	stack[n] = stack.pop();
	return ctx;
};

/**
 * Inserts copy of TOS @ TOS-2 in d-stack.
 *
 * ( x y -- y x y )
 *
 * @param ctx -
 */
export const tuck = (ctx: StackContext) => {
	$(ctx[0], 2);
	const stack = ctx[0];
	const a = stack.pop();
	stack.push(a, stack.pop(), a);
	return ctx;
};

/**
 * Rotates three topmost d-stack items downwards/to the left.
 *
 * ( x y z -- y z x )
 *
 * @param ctx -
 */
export const rot = (ctx: StackContext) => {
	const stack = ctx[0];
	const n = stack.length - 1;
	$n(n, 2);
	const c = stack[n - 2];
	stack[n - 2] = stack[n - 1];
	stack[n - 1] = stack[n];
	stack[n] = c;
	return ctx;
};

/**
 * Rotates three topmost d-stack items upwards/to the right.
 *
 * ( x y z -- z x y )
 *
 * @param ctx -
 */
export const invrot = (ctx: StackContext) => {
	const stack = ctx[0];
	const n = stack.length - 1;
	$n(n, 2);
	const c = stack[n];
	stack[n] = stack[n - 1];
	stack[n - 1] = stack[n - 2];
	stack[n - 2] = c;
	return ctx;
};

/**
 * Pushes copy of TOS-1 as new TOS on d-stack.
 *
 * ( x y -- x y x )
 *
 * @param ctx -
 */
export const over = __over(0);

/**
 * ( x -- x+1 )
 *
 * @param ctx -
 */
export const inc = __incdec(0, 1);

/**
 * ( x -- x-1 )
 *
 * @param ctx -
 */
export const dec = __incdec(0, -1);

//////////////////// R-Stack ops ////////////////////

/**
 * Pushes current r-stack size on d-stack.
 *
 * ( -- n )
 *
 * @param ctx -
 */
export const rsp = __xsp(1);

/**
 * Duplicates TOS on r-stack.
 *
 * ( x -- x x )
 *
 * @param ctx -
 */
export const rdup = __dup(1);

/**
 * Duplicates top 2 vals on r-stack.
 *
 * ( x y -- x y x y )
 *
 * @param ctx -
 */
export const rdup2 = __dup2(1);

/**
 * Duplicates top 3 vals on r-stack.
 *
 * ( x y -- x y x y )
 *
 * @param ctx -
 */
export const rdup3 = __dup3(1);

/**
 * Removes TOS from r-stack.
 *
 * ( x -- )
 *
 * @param ctx -
 */
export const rdrop = __drop(1);

/**
 * Removes top 2 vals from r-stack.
 *
 * ( x y -- )
 *
 * @param ctx -
 */
export const rdrop2 = __drop(1, 2);

export const movdr = __move(0, 1);

export const movrd = __move(1, 0);

export const cpdr = __copy(0, 1);

export const cprd = __copy(1, 0);

export const movdr2 = __move2(0, 1);

export const movrd2 = __move2(1, 0);

export const cpdr2 = __copy2(0, 1);

export const cprd2 = __copy2(1, 0);

/**
 * Swaps the two topmost r-stack items.
 *
 * ( x y -- y x )
 *
 * @param ctx -
 */
export const rswap = __swap(1);

/**
 * Swaps the two topmost d-stack pairs.
 *
 * ( a b c d -- c d a b )
 *
 * @param ctx -
 */
export const rswap2 = __swap2(1);

/**
 * Pushes copy of TOS-1 as new TOS on r-stack.
 *
 * ( x y -- x y x )
 *
 * @param ctx -
 */
export const rover = __over(1);

/**
 * Like {@link inc}, but applies to r-stack TOS.
 *
 * @param ctx -
 */
export const rinc = __incdec(1, 1);

/**
 * Like {@link dec}, but applies to r-stack TOS.
 *
 * @param ctx -
 */
export const rdec = __incdec(1, -1);
