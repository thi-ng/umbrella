import { NO_OP } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import type { Lit, Op1, Op2, Term } from "./api/nodes";
import type { Operator } from "./api/ops";
import { isLitNumeric } from "./ast/checks";
import { lit } from "./ast/lit";
import { allChildren, walk } from "./ast/scope";

const replaceNode = (node: any, next: any) => {
    for (let k in node) {
        !next.hasOwnProperty(k) && delete node[k];
    }
    return Object.assign(node, next);
};

const maybeFoldMath = (op: Operator, l: any, r: any) =>
    op === "+"
        ? l + r
        : op === "-"
        ? l - r
        : op === "*"
        ? l * r
        : op === "/"
        ? l / r
        : undefined;

export const foldNode = defmulti<Term<any>, void>((t) => t.tag);
foldNode.add(DEFAULT, NO_OP);

foldNode.addAll({
    op1: (t) => {
        const op = <Op1<any>>t;
        if (op.op == "-" && isLitNumeric(op.val)) {
            replaceNode(t, <Lit<"float">>op.val);
            (<any>op).val = -(<any>op).val;
        }
    },

    op2: (node) => {
        const op = <Op2<any>>node;
        if (isLitNumeric(op.l) && isLitNumeric(op.r)) {
            const vl = (<Lit<"float">>op.l).val;
            const vr = (<Lit<"float">>op.r).val;
            let res = maybeFoldMath(op.op, vl, vr);
            if (res !== undefined) {
                op.type === "int" && (res |= 0);
                op.type === "uint" && (res >>>= 0);
                replaceNode(node, lit(op.type, res));
            }
        }
    },
});

/**
 * Traverses given AST and applies constant folding optimizations where
 * possible. Returns possibly updated tree (mutates original).
 * Currently, only scalar operations are supported / considered.
 *
 * @example
 * ```ts
 * const foo = defn("float", "foo", ["float"], (x) => [
 *   ret(mul(x, add(neg(float(10)), float(42))))]
 * )
 *
 * const prog = scope([foo, foo(add(float(1), float(2)))], true);
 *
 * // serialized (GLSL)
 * glsl(prog);
 *
 * // float foo(in float _sym0) {
 * //   return (_sym0 * (-10.0 + 42.0));
 * // };
 * // foo((1.0 + 2.0));
 *
 * // with constant folding
 * glsl(constantFolding(prog))
 *
 * // float foo(in float _sym0) {
 * //   return (_sym0 * 32.0);
 * // };
 * // foo(3.0);
 * ```
 *
 * @param tree -
 */
export const constantFolding = (tree: Term<any>) => {
    walk((_, node) => foldNode(node), allChildren, <any>null, tree, false);
    return tree;
};
