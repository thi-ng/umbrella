import type { FnCall, Sym, Term } from "./nodes.js";
import type { SymOpts } from "./syms.js";
import type { Type } from "./types.js";

export type ScopeBody = (Term<any> | null | undefined)[];

export type Arg<A extends Type> = A | [A, string?, SymOpts?];

/** @deprecated */
export type Arg1<A extends Type> = VariadicArgs<[A]>;
/** @deprecated */
export type Arg2<A extends Type, B extends Type> = VariadicArgs<[A, B]>;
/** @deprecated */
export type Arg3<A extends Type, B extends Type, C extends Type> = VariadicArgs<
	[A, B, C]
>;
/** @deprecated */
export type Arg4<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type
> = VariadicArgs<[A, B, C, D]>;
/** @deprecated */
export type Arg5<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type
> = VariadicArgs<[A, B, C, D, E]>;
/** @deprecated */
export type Arg6<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type
> = VariadicArgs<[A, B, C, D, E, F]>;
/** @deprecated */
export type Arg7<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type,
	G extends Type
> = VariadicArgs<[A, B, C, D, E, F, G]>;
/** @deprecated */
export type Arg8<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type,
	G extends Type,
	H extends Type
> = VariadicArgs<[A, B, C, D, E, F, G, H]>;

export type FnBody0 = VariadicFnBody<[]>;
export type FnBody1<A extends Type> = VariadicFnBody<[A]>;
/** @deprecated */
export type FnBody2<A extends Type, B extends Type> = VariadicFnBody<[A, B]>;
/** @deprecated */
export type FnBody3<
	A extends Type,
	B extends Type,
	C extends Type
> = VariadicFnBody<[A, B, C]>;
/** @deprecated */
export type FnBody4<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type
> = VariadicFnBody<[A, B, C, D]>;
/** @deprecated */
export type FnBody5<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type
> = VariadicFnBody<[A, B, C, D, E]>;
/** @deprecated */
export type FnBody6<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type
> = VariadicFnBody<[A, B, C, D, E, F]>;
/** @deprecated */
export type FnBody7<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type,
	G extends Type
> = VariadicFnBody<[A, B, C, D, E, F, G]>;
/** @deprecated */
export type FnBody8<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type,
	G extends Type,
	H extends Type
> = VariadicFnBody<[A, B, C, D, E, F, G, H]>;

/** @deprecated */
export type Func0<T extends Type> = VariadicFunc<[], T>;
/** @deprecated */
export type Func1<A extends Type, T extends Type> = VariadicFunc<[A], T>;
/** @deprecated */
export type Func2<
	A extends Type,
	B extends Type,
	T extends Type
> = VariadicFunc<[A, B], T>;
/** @deprecated */
export type Func3<
	A extends Type,
	B extends Type,
	C extends Type,
	T extends Type
> = VariadicFunc<[A, B, C], T>;
/** @deprecated */
export type Func4<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	T extends Type
> = VariadicFunc<[A, B, C, D], T>;
/** @deprecated */
export type Func5<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	T extends Type
> = VariadicFunc<[A, B, C, D, E], T>;
/** @deprecated */
export type Func6<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type,
	T extends Type
> = VariadicFunc<[A, B, C, D, E, F], T>;
/** @deprecated */
export type Func7<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type,
	G extends Type,
	T extends Type
> = VariadicFunc<[A, B, C, D, E, F, G], T>;
/** @deprecated */
export type Func8<
	A extends Type,
	B extends Type,
	C extends Type,
	D extends Type,
	E extends Type,
	F extends Type,
	G extends Type,
	H extends Type,
	T extends Type
> = VariadicFunc<[A, B, C, D, E, F, G, H], T>;

export type VariadicFunc<Xs extends Type[], T extends Type> = VariadicFn<
	VariadicTerms<Xs>,
	FnCall<T>
>;
export type VariadicFnBody<Xs extends Type[]> = VariadicFn<
	VariadicSyms<Xs>,
	ScopeBody
>;
type VariadicFn<Xs extends unknown[], Y> = (...xs: Xs) => Y;
export type VariadicArgs<Xs extends Type[]> = {
	[i in keyof Xs]: Arg<Xs[i]>;
};
export type VariadicSyms<Xs extends Type[]> = {
	[i in keyof Xs]: Sym<Xs[i]>;
};
export type VariadicTerms<Xs extends Type[]> = {
	[i in keyof Xs]: Term<Xs[i]>;
};
type TypeOfArg<X> = X extends Arg<infer A> ? A : never;
export type VariadicTypeOfArg<Xs extends unknown[]> = { [i in keyof Xs]: TypeOfArg<Xs[i]> };
