import {
    Lit,
    Op1,
    Op2,
    Term
} from "./api/nodes";
import { isLitNumeric } from "./ast/checks";
import { lit } from "./ast/lit";
import { allChildren, walk } from "./ast/scope";

const replaceNode = (node: any, next: any) => {
    for (let k in node) {
        !next.hasOwnProperty(k) && delete node[k];
    }
    return Object.assign(node, next);
};

/**
 * Traverses given AST and applies constant folding optimizations where
 * possible. Returns possibly updated tree (mutates original).
 * Currently, only scalar operations are supported / considered.
 *
 * ```
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
 * @param tree
 */
export const constantFolding = (tree: Term<any>) => {
    walk(
        (_, node) => {
            switch (node.tag) {
                case "op1": {
                    const n = <Op1<any>>node;
                    if (n.op == "-" && isLitNumeric(n.val)) {
                        replaceNode(node, <Lit<"float">>n.val);
                        (<any>n).val = -(<any>n).val;
                    }
                    break;
                }
                case "op2": {
                    const n = <Op2<any>>node;
                    if (isLitNumeric(n.l) && isLitNumeric(n.r)) {
                        const vl = (<Lit<"float">>n.l).val;
                        const vr = (<Lit<"float">>n.r).val;
                        let res =
                            n.op === "+"
                                ? vl + vr
                                : n.op === "-"
                                ? vl - vr
                                : n.op === "*"
                                ? vl * vr
                                : n.op === "/"
                                ? vl / vr
                                : undefined;
                        if (res !== undefined) {
                            n.type === "int" && (res |= 0);
                            n.type === "uint" && (res >>>= 0);
                            replaceNode(node, lit(n.type, res));
                        }
                    }
                    break;
                }
                default:
            }
        },
        allChildren,
        <any>null,
        tree,
        false
    );
    return tree;
};
