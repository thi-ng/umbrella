import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";

import { COMPACT, CSSOpts, DEFAULT_VENDORS } from "./api";
import { expand, formatDecls } from "./impl";

export function css(rules: any, opts?: Partial<CSSOpts>) {
    opts = {
        format: COMPACT,
        vendors: DEFAULT_VENDORS,
        fns: {},
        depth: 0,
        ...opts
    };
    if (isPlainObject(rules)) {
        return formatDecls(rules, <CSSOpts>opts);
    }
    if (isArray(opts.autoprefix)) {
        opts.autoprefix = new Set(opts.autoprefix);
    }
    if (isIterable(rules) && !isString(rules)) {
        rules = [...rules];
    }
    if (isArray(rules)) {
        return expand([], [], rules, <CSSOpts>opts).join(opts.format.rules);
    }
    if (isFunction(rules)) {
        return rules([], opts).join(opts.format.rules);
    }
}
