import type {
    Func0,
    Func1,
    Func2,
    Func3,
    Func4,
    Func5,
    Func6,
    Func7,
    Func8,
} from "./function.js";
import type { Operator } from "./ops.js";
import type { SymOpts } from "./syms.js";
import type { Tag } from "./tags.js";
import type { BoolTerm } from "./terms.js";
import type { Assignable, Indexable, Mat, Type, Vec } from "./types.js";

export interface Term<T extends Type> {
    tag: Tag;
    type: T;
}

export type TermType<T extends Term<any>> = T["type"];

export interface Scoped {
    scope: Scope;
}

export interface Lit<T extends Type> extends Term<T> {
    val: any;
    info?: string;
}

export interface Sym<T extends Type> extends Term<T> {
    id: string;
    opts: SymOpts;
    init?: Term<T>;
}

export interface ArrayInit<T extends Type> extends Term<T> {
    init: (Sym<T> | Lit<T>)[];
}

export interface Decl<T extends Type> extends Term<T> {
    id: Sym<T>;
}

export interface Swizzle<T extends Type> extends Term<T> {
    id: string;
    val: Term<Vec>;
}

export interface Index<T extends Type> extends Term<T> {
    id: Term<"int"> | Term<"uint">;
    val: Term<Indexable>;
}

export interface IndexM<T extends Type> extends Term<T> {
    id: Term<"int"> | Term<"uint">;
    val: Term<Mat>;
}

export interface Assign<T extends Type> extends Term<T> {
    l: Assignable<T>;
    r: Term<T>;
}

export interface Op1<T extends Type> extends Term<T> {
    op: Operator;
    val: Term<any>;
    post?: boolean;
}

export interface Op2<T extends Type> extends Term<T> {
    info?: string;
    op: Operator;
    l: Term<any>;
    r: Term<any>;
}

export interface Scope extends Term<"void"> {
    body: Term<any>[];
    global: boolean;
}

export interface Branch extends Term<"void"> {
    test: BoolTerm;
    t: Scope;
    f?: Scope;
}

export interface Ternary<T extends Type> extends Term<T> {
    test: BoolTerm;
    t: Term<T>;
    f: Term<T>;
}

export interface ControlFlow extends Term<"void"> {
    tag: "ctrl";
    id: string;
}

export interface FuncReturn<T extends Type> extends Term<T> {
    val?: Term<any>;
}

export interface FuncArg<T extends Type> extends Term<T> {
    id: string;
    opts: SymOpts;
}

export interface Func<T extends Type> extends Term<T>, Scoped {
    id: string;
    args: Sym<any>[];
    deps: Func<any>[];
}

export interface TaggedFn0<T extends Type> extends Func0<T>, Func<T> {
    args: [];
}

export interface TaggedFn1<A extends Type, T extends Type>
    extends Func1<A, T>,
        Func<T> {
    args: [Sym<A>];
}

export interface TaggedFn2<A extends Type, B extends Type, T extends Type>
    extends Func2<A, B, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>];
}

export interface TaggedFn3<
    A extends Type,
    B extends Type,
    C extends Type,
    T extends Type
> extends Func3<A, B, C, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>];
}

export interface TaggedFn4<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    T extends Type
> extends Func4<A, B, C, D, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>];
}

export interface TaggedFn5<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    T extends Type
> extends Func5<A, B, C, D, E, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>];
}

export interface TaggedFn6<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    T extends Type
> extends Func6<A, B, C, D, E, F, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>];
}

export interface TaggedFn7<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    T extends Type
> extends Func7<A, B, C, D, E, F, G, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, Sym<G>];
}

export interface TaggedFn8<
    A extends Type,
    B extends Type,
    C extends Type,
    D extends Type,
    E extends Type,
    F extends Type,
    G extends Type,
    H extends Type,
    T extends Type
> extends Func8<A, B, C, D, E, F, G, H, T>,
        Func<T> {
    args: [Sym<A>, Sym<B>, Sym<C>, Sym<D>, Sym<E>, Sym<F>, Sym<G>, Sym<H>];
}

export interface FnCall<T extends Type> extends Term<T> {
    id: string;
    args: Term<any>[];
    info?: string;
    fn?: Func<T>;
}

export interface ForLoop extends Term<"void">, Scoped {
    init?: Decl<any>;
    test: BoolTerm;
    iter?: Term<any>;
}

export interface WhileLoop extends Term<"void">, Scoped {
    test: BoolTerm;
}
