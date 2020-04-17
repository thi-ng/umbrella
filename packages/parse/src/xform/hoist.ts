import { Parser, ScopeTransform } from "../api";
import { xform } from "../combinators/xform";

export const xfHoist: ScopeTransform<any> = (scope) => {
    scope!.result = scope!.children![0].result;
    scope!.children = null;
    return scope;
};

export const hoist = <T>(parser: Parser<T>) => xform(parser, xfHoist);
