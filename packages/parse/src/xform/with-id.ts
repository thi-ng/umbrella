import type { ScopeTransform, Parser } from "../api.js";
import { xform } from "../combinators/xform.js";

/**
 * Assigns given `id` to AST node. E.g. used for re-labeling parser
 * results defined by {@link defGrammar}.
 *
 * @param id
 */
export const xfID = (id: string): ScopeTransform<any> => (scope) => (
    (scope!.id = id), scope
);

export const withID = <T>(id: string, parser: Parser<T>) =>
    xform(parser, xfID(id));
