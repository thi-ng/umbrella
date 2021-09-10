import { isFunction } from "@thi.ng/checks/is-function";
import type { Parser, PassValue } from "../api";

/**
 * Parser which consumes no input and always succeeds. Adds new AST node
 * with `result`.
 *
 * @param result -
 * @param id -
 */
export const pass =
    <R = any>(result: PassValue<R>, id = "pass"): Parser<any> =>
    (ctx) =>
        ctx.addChild(id, isFunction(result) ? result() : result);

/**
 * Parser which consumes no input and always succeeds. No AST creation.
 */
export const passD: Parser<any> = () => true;
