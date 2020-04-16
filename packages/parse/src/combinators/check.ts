import type { Predicate } from "@thi.ng/api";
import type { Parser, ParseScope } from "../api";
import { parseError } from "../error";
import { xform } from "./xform";

export const check = <T>(
    parser: Parser<T>,
    pred: Predicate<ParseScope<T>>,
    msg = "check failed"
) =>
    xform(parser, (scope, ctx) => {
        if (!pred(scope!)) parseError(ctx, msg);
        return scope;
    });
