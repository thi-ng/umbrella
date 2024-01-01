import type { Nullable } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import type {
    Arg,
    VariadicArgs,
    VariadicFnBody,
    FnBody0,
    ScopeBody,
    VariadicTerms,
    VariadicTypeOfArg,
} from "../api/function.js";
import type {
	FnCall,
	Func,
	FuncArg,
	FuncReturn,
	Sym,
	VariadicTaggedFn,
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
 * Defines a new function with variadic typed checked arguments.
 *
 * @param type - return type
 * @param name - function name
 * @param args - arg types / names / opts
 * @param body - function body closure
 */
export function defn<
	T extends Type,
    Args extends VariadicArgs<Type[]>,
    Xs extends VariadicTypeOfArg<Args>,
>(
	type: T,
	name: Nullable<string>,
	args: [...Args],
	body: VariadicFnBody<Xs>
): VariadicTaggedFn<Xs, T>;
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

export function funcall<T extends Type>(fn: string, type: T, ...args: Term<any>[]): FnCall<T>;
export function funcall<Xs extends Type[], T extends Type>(
	fn: VariadicTaggedFn<Xs, T>,
	...args: VariadicTerms<Xs>
): FnCall<T>;
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
