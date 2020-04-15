import { isFunction } from "@thi.ng/checks";
import type { Lift, Parser } from "../api";

export const lift = <R = any>(result: Lift<R>, id = "lift"): Parser<any> => (
    ctx
) => {
    const scope = ctx.start(id);
    scope.result = isFunction(result) ? result() : result;
    return ctx.end();
};
