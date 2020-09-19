import {
    isArray,
    isFunction,
    isNotStringAndIterable,
    isPlainObject,
} from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { COMPACT, CSSOpts, DEFAULT_VENDORS } from "./api";
import { expand, formatDecls } from "./impl";

export const css = (rules: any, opts?: Partial<CSSOpts>) => {
    opts = {
        format: COMPACT,
        vendors: DEFAULT_VENDORS,
        fns: {},
        depth: 0,
        ...opts,
    };
    isArray(opts.autoprefix) && (opts.autoprefix = new Set(opts.autoprefix));
    return isPlainObject(rules)
        ? formatDecls(rules, <CSSOpts>opts)
        : isFunction(rules)
        ? rules([], <CSSOpts>opts).join(opts.format!.rules)
        : expand(
              [],
              [],
              isArray(rules)
                  ? rules
                  : isNotStringAndIterable(rules)
                  ? [...rules]
                  : illegalArgs(`invalid rules`),
              <CSSOpts>opts
          ).join(opts.format!.rules);
};
