import type { Nullable } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import type {
	Arg,
	Arg1,
	Arg2,
	Arg3,
	Arg4,
	Arg5,
	Arg6,
	Arg7,
	Arg8,
	FnBody0,
	FnBody1,
	FnBody2,
	FnBody3,
	FnBody4,
	FnBody5,
	FnBody6,
	FnBody7,
	FnBody8,
	ScopeBody,
} from "../api/function.js";
import type {
	FnCall,
	Func,
	FuncArg,
	FuncReturn,
	Sym,
	TaggedFn0,
	TaggedFn1,
	TaggedFn2,
	TaggedFn3,
	TaggedFn4,
	TaggedFn5,
	TaggedFn6,
	TaggedFn7,
	TaggedFn8,
	Term,
} from "../api/nodes.js";
import type { SymOpts } from "../api/syms.js";
import type { Type } from "../api/types.js";
import { gensym } from "./idgen.js";
import { allChildren, scope, scopedChildren, walk } from "./scope.js";
import { sym } from "./sym.js";

const defArg = <T extends Type>(a: Arg<T>): FuncArg<T> => {
	const [type, id, opts] = isString(a) ? <[T, string?, SymOpts?]>[a] : a;
	return {
		tag: "arg",
		type,
		id: id || gensym(),
		opts: { q: "in", ...opts },
	};
};

/**
 * Defines a new function with up to 8 typed checked arguments.
 *
 * @param type - return type
 * @param name - function name
 * @param args - arg types / names / opts
 * @param body - function body closure
 */
// prettier-ignore
export function defn<T extends Type>(type: T, name: Nullable<string>, args: [], body: FnBody0): TaggedFn0<T>;
// prettier-ignore
export function defn<T extends Type, A extends Type>(type: T, name: Nullable<string>, args: Arg1<A>, body: FnBody1<A>): TaggedFn1<A,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type>(type: T, name: Nullable<string>, args: Arg2<A,B>, body: FnBody2<A,B>): TaggedFn2<A,B,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type>(type: T, name: Nullable<string>, args: Arg3<A,B,C>, body: FnBody3<A,B,C>): TaggedFn3<A,B,C,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type>(type: T, name: Nullable<string>, args: Arg4<A,B,C,D>, body: FnBody4<A,B,C,D>): TaggedFn4<A,B,C,D,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type>(type: T, name: Nullable<string>, args: Arg5<A,B,C,D,E>, body: FnBody5<A,B,C,D,E>): TaggedFn5<A,B,C,D,E,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type>(type: T, name: Nullable<string>, args: Arg6<A,B,C,D,E,F>, body: FnBody6<A,B,C,D,E,F>): TaggedFn6<A,B,C,D,E,F,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, G extends Type>(type: T, name: Nullable<string>, args: Arg7<A,B,C,D,E,F,G>, body: FnBody7<A,B,C,D,E,F,G>): TaggedFn7<A,B,C,D,E,F,G,T>;
// prettier-ignore
export function defn<T extends Type, A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, G extends Type, H extends Type>(type: T, name: Nullable<string>, args: Arg8<A,B,C,D,E,F,G,H>, body: FnBody8<A,B,C,D,E,F,G,H>): TaggedFn8<A,B,C,D,E,F,G,H,T>;
// prettier-ignore
export function defn(type: Type, id: Nullable<string>, _args: Arg<any>[], _body: (...xs: Sym<any>[]) => ScopeBody): Func<any> {
    id = id || gensym();
    const args = _args.map(defArg);
    const body = <Term<any>[]>(
        _body(...args.map((x) => sym(x.type, x.id, x.opts))).filter(
            (x) => x != null
        )
    );
    // count & check returns
    const returns = walk(
        (n, t) => {
            if (t.tag === "ret") {
                assert(
                    t.type === type,
                    `wrong return type for function '${id}', expected ${type}, got ${
                        t.type
                    }`
                );
                n++;
            }
            return n;
        },
        scopedChildren,
        0,
        body
    );
    if (type !== "void" && !returns) {
        throw new Error(`function '${id}' must return a value of type ${type}`);
    }
    // verify all non-builtin functions called are also
    // provided as deps to ensure complete call graph later
    const deps = walk(
        (acc, t) => {
            if (t.tag === "call" && (<FnCall<any>>t).fn) {
                acc.push((<FnCall<any>>t).fn!);
            }
            return acc;
        },
        allChildren,
        <Func<any>[]>[],
        body
    );
    const $: any = (...xs: any[]) => (<any>funcall)($, ...xs);
    return Object.assign($, <Func<any>>{
        tag: "fn",
        type,
        id,
        args,
        deps,
        scope: scope(body)
    });
}

/**
 * Syntax sugar for defining `void main()` functions.
 *
 * @param body -
 */
export const defMain = (body: FnBody0) => defn("void", "main", [], body);

export function ret(): FuncReturn<"void">;
export function ret<T extends Type>(val: Term<T>): FuncReturn<T>;
export function ret(val?: Term<any>): FuncReturn<any> {
	return {
		tag: "ret",
		type: val ? val.type : "void",
		val,
	};
}

// prettier-ignore
export function funcall<T extends Type>(fn: string, type: T, ...args: Term<any>[]): FnCall<T>;
export function funcall<T extends Type>(fn: TaggedFn0<T>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, T extends Type>(fn: TaggedFn1<A,T>, a: Term<A>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, T extends Type>(fn: TaggedFn2<A,B,T>, a: Term<A>, b: Term<B>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, T extends Type>(fn: TaggedFn3<A,B,C,T>, a: Term<A>, b: Term<B>, c: Term<C>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, T extends Type>(fn: TaggedFn4<A,B,C,D,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, T extends Type>(fn: TaggedFn5<A,B,C,D,E,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>, e: Term<E>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, T extends Type>(fn: TaggedFn6<A,B,C,D,E,F,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>, e: Term<E>, f: Term<F>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, G extends Type, T extends Type>(fn: TaggedFn7<A,B,C,D,E,F,G,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>, e: Term<E>, f: Term<F>, g: Term<G>): FnCall<T>;
// prettier-ignore
export function funcall<A extends Type, B extends Type, C extends Type, D extends Type, E extends Type, F extends Type, G extends Type, H extends Type, T extends Type>(fn: TaggedFn8<A,B,C,D,E,F,G,H,T>, a: Term<A>, b: Term<B>, c: Term<C>, d: Term<D>, e: Term<E>, f: Term<F>, g: Term<G>, h: Term<H>): FnCall<T>;
// prettier-ignore
export function funcall(fn: string | Func<any>, ...args: Term<any>[]): FnCall<any> {
    return isString(fn)
        ? {
              tag: "call",
              type: args[0],
              id: fn,
              args: args.slice(1)
          }
        : {
              tag: "call",
              type: fn.type,
              id: fn.id,
              args,
              fn
          };
}

export const builtinCall = <T extends Type>(
	id: string,
	type: T,
	...args: Term<any>[]
): FnCall<T> => ({
	tag: "call_i",
	type,
	id,
	args,
});
