import type { Fn, Fn0, Fn2, Fn3, Fn4, Fn5, Fn6, Fn7, Fn8 } from "@thi.ng/api";
import type { FnCall, Sym, Term } from "./nodes";
import type { SymOpts } from "./syms";
import type { Type } from "./types";

export type ScopeBody = (Term<any> | null | undefined)[];

export type Arg<A extends Type> = A | [A, string?, SymOpts?];

export type Arg1<A extends Type> = [Arg<A>];

export type Arg2<A extends Type, B extends Type> = [Arg<A>, Arg<B>];

export type Arg3<A extends Type, B extends Type, C extends Type> = [
    Arg<A>,
    Arg<B>,
    Arg<C>
];

export type Arg4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>];

export type Arg5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>];

export type Arg6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>, Arg<F>];

export type Arg7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>, Arg<F>, Arg<G>];

export type Arg8<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    H extends Type
> = [Arg<A>, Arg<B>, Arg<C>, Arg<D>, Arg<E>, Arg<F>, Arg<G>, Arg<H>];

export type FnBody0 = Fn0<ScopeBody>;

export type FnBody1<A extends Type> = Fn<Sym<A>, ScopeBody>;

export type FnBody2<A extends Type, B extends Type> = Fn2<
    Sym<A>,
    Sym<B>,
    ScopeBody
>;

export type FnBody3<A extends Type, B extends Type, C extends Type> = Fn3<
    Sym<A>,
    Sym<B>,
    Sym<C>,
    ScopeBody
>;

export type FnBody4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type
> = Fn4<Sym<A>, Sym<B>, Sym<C>, Sym<D>, ScopeBody>;

export type FnBody5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type
> = Fn5<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, ScopeBody>;

export type FnBody6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type
> = Fn6<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, ScopeBody>;

export type FnBody7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type
> = Fn7<Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, Sym<G>, ScopeBody>;

export type FnBody8<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    H extends Type
> = Fn8<
    Sym<A>,
    Sym<B>,
    Sym<C>,
    Sym<D>,
    Sym<E>,
    Sym<F>,
    Sym<G>,
    Sym<H>,
    ScopeBody
>;

export type Func0<T extends Type> = Fn0<FnCall<T>>;

export type Func1<A extends Type, T extends Type> = Fn<Term<A>, FnCall<T>>;

export type Func2<A extends Type, B extends Type, T extends Type> = Fn2<
    Term<A>,
    Term<B>,
    FnCall<T>
>;

export type Func3<
    A extends Type,
    B extends Type,
    C extends Type,
    T extends Type
> = Fn3<Term<A>, Term<B>, Term<C>, FnCall<T>>;

export type Func4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    T extends Type
> = Fn4<Term<A>, Term<B>, Term<C>, Term<D>, FnCall<T>>;

export type Func5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    T extends Type
> = Fn5<Term<A>, Term<B>, Term<C>, Term<D>, Term<E>, FnCall<T>>;

export type Func6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    T extends Type
> = Fn6<Term<A>, Term<B>, Term<C>, Term<D>, Term<E>, Term<F>, FnCall<T>>;

export type Func7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    T extends Type
> = Fn7<
    Term<A>,
    Term<B>,
    Term<C>,
    Term<D>,
    Term<E>,
    Term<F>,
    Term<G>,
    FnCall<T>
>;

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
> = Fn8<
    Term<A>,
    Term<B>,
    Term<C>,
    Term<D>,
    Term<E>,
    Term<F>,
    Term<G>,
    Term<H>,
    FnCall<T>
>;
