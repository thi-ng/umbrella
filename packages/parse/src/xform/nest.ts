import type { Parser, ScopeTransform } from "../api.js";
import { xform } from "../combinators/xform.js";
import { defContext } from "../context.js";
import { xfJoin } from "./join.js";

/**
 * HOF scope transform which applies given parser to result of given scope's
 * result, or if result is null, first joins children using {@link xfJoin}.
 *
 * @remarks
 * The nested parser is applied to a separate {@link ParseContext} and if
 * successful, the resulting AST will be transplated into the current parse
 * scope. If the nested parser fails, the scope will remain untouched.
 *
 * If the current parse context retains line/column details, the inner parse
 * context will be configured to produce true absolute offsets for its results
 * as if they were in the main context.
 *
 * @param parser
 */
export const xfNest =
    (parser: Parser<string>): ScopeTransform<string> =>
    (scope, ctx) => {
        if (!scope) return;
        const src = scope.result || xfJoin({ ...scope })!.result;
        const inner = defContext(src, ctx.opts);
        const state = scope.state;
        if (state) {
            const istate = inner.scope.state!;
            istate.l = state.l;
            istate.c = state.c;
        }
        if (parser(inner)) {
            scope.result = null;
            scope.children = inner.children;
        }
        return scope;
    };

export const nest = (outer: Parser<string>, inner: Parser<string>) =>
    xform(outer, xfNest(inner));
