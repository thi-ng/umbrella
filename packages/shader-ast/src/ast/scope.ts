import type { Fn, Fn2 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { DGraph } from "@thi.ng/dgraph";
import type {
    Assign,
    Branch,
    Decl,
    FnCall,
    Func,
    FuncReturn,
    Lit,
    Op1,
    Op2,
    Scope,
    Sym,
    Term,
    Ternary,
} from "../api/nodes";
import type { Type } from "../api/types";
import { isMat, isTerm, isVec } from "./checks";

/**
 * Helper function for {@link walk}. Returns child nodes for any control
 * flow nodes containing a child scope.
 *
 * {@link allChildren}
 */
export const scopedChildren = (t: Term<any>) =>
    t.tag === "fn" || t.tag === "for" || t.tag == "while"
        ? (<Func<any>>t).scope.body
        : t.tag === "if"
        ? (<Branch>t).f
            ? (<Branch>t).t.body.concat((<Branch>t).f!.body)
            : (<Branch>t).t.body
        : undefined;

/**
 * Helper function for {@link walk}. Returns an array of all child nodes for
 * a given term (if any).
 *
 * {@link scopedChildren}
 */
export const allChildren = (t: Term<any>) =>
    scopedChildren(t) ||
    (t.tag === "scope"
        ? (<Scope>t).body
        : t.tag === "ternary"
        ? [(<Ternary<any>>t).t, (<Ternary<any>>t).f]
        : t.tag === "ret"
        ? [(<FuncReturn<any>>t).val]
        : t.tag === "call" || t.tag === "call_i"
        ? (<FnCall<any>>t).args
        : t.tag === "sym" && (<Sym<any>>t).init
        ? [(<Sym<any>>t).init]
        : t.tag === "decl"
        ? [(<Decl<any>>t).id]
        : t.tag === "op1" || t.tag === "swizzle"
        ? [(<Op1<any>>t).val]
        : t.tag === "op2"
        ? [(<Op2<any>>t).l, (<Op2<any>>t).r]
        : t.tag === "assign"
        ? [(<Assign<any>>t).r]
        : isVec(t) || isMat(t)
        ? (<Lit<any>>t).val
        : isTerm((<Lit<any>>t).val)
        ? (<Lit<any>>t).val
        : undefined);

/**
 * Traverses given AST in depth-first order and applies `visit` and
 * `children` fns to each node. Descends only further if `children`
 * returns an array of child nodes. The `visit` function must accept 2
 * args: the accumulator (`acc`) given to {@link walk} and a tree node. The
 * return value of `visit` becomes the new `acc` value, much like in a
 * reduce operation. {@link walk} itself returns the final `acc`.
 *
 * If `pre` is true (default), the `visit` function will be called prior
 * to visiting a node's children. If false, the visitor is called on the
 * way back up.
 *
 * @param visit -
 * @param children -
 * @param acc -
 * @param tree -
 * @param pre -
 */
export const walk = <T>(
    visit: Fn2<T, Term<any>, T>,
    children: Fn<Term<any>, Term<any>[] | undefined>,
    acc: T,
    tree: Term<any> | Term<any>[],
    pre = true
) => {
    if (isArray(tree)) {
        tree.forEach((x) => (acc = walk(visit, children, acc, x, pre)));
    } else {
        pre && (acc = visit(acc, tree));
        const c = children(tree);
        c && (acc = walk(visit, children, acc, c, pre));
        !pre && (acc = visit(acc, tree));
    }
    return acc;
};

/**
 * Builds dependency graph of given function, by recursively adding all
 * function dependencies. Returns graph.
 *
 * @param fn -
 * @param graph -
 */
export const buildCallGraph = (
    fn: Func<any>,
    graph: DGraph<Func<any>> = new DGraph()
): DGraph<Func<any>> =>
    fn.deps && fn.deps.length
        ? fn.deps.reduce(
              (graph, d) => buildCallGraph(d, graph.addDependency(fn, d)),
              graph
          )
        : graph.addNode(fn);

export const decl = <T extends Type>(id: Sym<T>): Decl<T> => ({
    tag: "decl",
    type: id.type,
    id,
});

/**
 * Wraps the given AST node array in `scope` node, optionally as global
 * scope (default false). The interpretation of the global flag is
 * dependent on the target code gen. I.e. for GLSL / JS, the flag
 * disables wrapping the scope's body in `{}`, but else has no
 * difference. In general this node type only serves as internal
 * mechanism for various control flow AST nodes and should not need to
 * be used directly from user land code (though might be useful to
 * create custom / higher level control flow nodes).
 *
 * @param body -
 * @param global -
 */
export const scope = (body: (Term<any> | null)[], global = false): Scope => ({
    tag: "scope",
    type: "void",
    body: <Term<any>[]>(
        body
            .filter((x) => x != null)
            .map((x) => (x!.tag === "sym" ? decl(<Sym<any>>x) : x))
    ),
    global,
});

/**
 * Takes an array of global sym/var definitions ({@link input},
 * {@link output}, {@link uniform}) and functions defined via
 * {@link (defn:1)}. Constructs the call graph of all transitively used
 * functions and bundles everything in topological order within a global
 * scope object, which is then returned to the user and can be passed to
 * a target codegen for full program output.
 *
 * - {@link scope}
 * - {@link input}
 * - {@link output}
 * - {@link uniform}
 *
 * @param body -
 */
export const program = (body: (Sym<any> | Func<any>)[]) => {
    const syms = body.filter((x) => x.tag !== "fn");
    const g = body.reduce(
        (acc, x) => (x.tag === "fn" ? buildCallGraph(<Func<any>>x, acc) : acc),
        new DGraph<Func<any>>()
    );
    return scope(syms.concat(g.sort()), true);
};
