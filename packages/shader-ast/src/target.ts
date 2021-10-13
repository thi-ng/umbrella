import type { Fn } from "@thi.ng/api";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { unsupported } from "@thi.ng/errors/unsupported";
import type { Term } from "./api/nodes.js";
import type { TargetImpl } from "./api/target.js";

/**
 * Takes an object of code generator functions and returns a new code
 * generator / compile target function which serializes a given AST
 * using the provided node type implementations.
 *
 * {@link @thi.ng/shader-ast-glsl#targetGLSL}
 *
 * @param impls -
 */
export const defTarget = <T>(impls: TargetImpl<T>): Fn<Term<any>, T> =>
    defmulti<Term<any>, T>(
        (x) => x.tag,
        {},
        {
            [DEFAULT]: (t: Term<any>) =>
                unsupported(`no impl for AST node type: '${t.tag}'`),
            ...(<any>impls),
        }
    );
