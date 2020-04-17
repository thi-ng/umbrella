import { isFunction } from "@thi.ng/checks";
import type { PassValue, Parser } from "../api";

export const pass = <R = any>(
    result: PassValue<R>,
    id = "lift"
): Parser<any> => (ctx) =>
    ctx.addChild(id, isFunction(result) ? result() : result);
