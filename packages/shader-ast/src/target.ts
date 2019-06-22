import { Fn } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { unsupported } from "@thi.ng/errors";
import { TargetImpl, Term } from "./api";

/**
 * Returns a new code generator / compile target function which
 * serializes a given AST using the provided node type implementations.
 *
 * @param impls
 *
 * @see targetGLSL
 */
export const defTarget = <T>(impls: TargetImpl<T>): Fn<Term<any>, T> => {
    const emit = defmulti<Term<any>, T>((x) => x.tag);
    emit.add(DEFAULT, (t) =>
        unsupported(`no impl for AST node type: '${t.tag}'`)
    );
    emit.addAll(<any>impls);
    return emit;
};
