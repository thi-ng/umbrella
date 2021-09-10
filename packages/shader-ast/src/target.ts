import type { Fn } from "@thi.ng/api";
import { DEFAULT } from "@thi.ng/defmulti/constants";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import { unsupported } from "@thi.ng/errors/unsupported";
import type { Term } from "./api/nodes";
import type { TargetImpl } from "./api/target";

/**
 * Takes an object of code generator functions and returns a new code
 * generator / compile target function which serializes a given AST
 * using the provided node type implementations.
 *
 * {@link @thi.ng/shader-ast-glsl#targetGLSL}
 *
 * @param impls -
 */
export const defTarget = <T>(impls: TargetImpl<T>): Fn<Term<any>, T> => {
    const emit = defmulti<Term<any>, T>((x) => x.tag);
    emit.add(DEFAULT, (t) =>
        unsupported(`no impl for AST node type: '${t.tag}'`)
    );
    emit.addAll(<any>impls);
    return emit;
};
