import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isString } from "@thi.ng/checks/is-string";
import { transduce } from "@thi.ng/transducers/transduce";
import { permutations } from "@thi.ng/transducers/iter/permutations";
import { str } from "@thi.ng/transducers/rfn/str";
import { flatten } from "@thi.ng/transducers/xform/flatten";
import { map } from "@thi.ng/transducers/xform/map";

import { CSSOpts, COMPACT, DEFAULT_VENDORS } from "./api";
import { indent } from "./utils";

const NO_SPACES = ":[";

const EMPTY = new Set<string>();

const xfSel = ((a, b) => (x) => a(b(x)))(
    flatten(),
    map((x: string) => NO_SPACES.indexOf(x.charAt(0)) >= 0 ? x : " " + x)
);

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
        return _css([], [], rules, <CSSOpts>opts).join(opts.format.rules);
    }
    if (isFunction(rules)) {
        return rules([], opts).join(opts.format.rules);
    }
}

export function _css(acc: string[], parent: any[], rules: any[], opts: CSSOpts) {
    const n = rules.length;
    const sel: string[] = [];
    let curr: any, isFn;

    function process(i, r) {
        if (isArray(r)) {
            _css(acc, makeSelector(parent, sel), r, opts);
        } else if (isIterable(r) && !isString(r)) {
            _css(acc, makeSelector(parent, sel), [...r], opts);
        } else if ((isFn = isFunction(r)) || opts.fns[r]) {
            if (i === 0) {
                if (opts.fns[r]) {
                    opts.fns[r].apply(null, rules.slice(i + 1))(acc, opts);
                    return true;
                }
                r(acc, opts);
            } else if (isFn) {
                process(i, r());
            } else {
                throw new Error(`quoted fn ('${r}') only allowed at head position`);
            }
        } else if (isPlainObject(r)) {
            curr = Object.assign(curr || {}, r);
        } else if (r != null) {
            sel.push(r);
        }
    }

    for (let i = 0; i < n; i++) {
        if (process(i, rules[i])) {
            return acc;
        }
    }
    if (curr) {
        acc.push(formatRule(parent, sel, curr, opts));
    }
    return acc;
}

export function formatDecls(rules: any, opts: CSSOpts) {
    const f = opts.format;
    const prefixes = <Set<string>>(opts.autoprefix || EMPTY);
    const space = indent(opts, opts.depth + 1);
    const acc = [];
    for (let r in rules) {
        if (rules.hasOwnProperty(r)) {
            let val = rules[r];
            if (isFunction(val)) {
                val = val(rules);
            }
            if (isArray(val)) {
                val = val.map((v) => isArray(v) ? v.join(" ") : v).join(f.ruleSep);
            }
            if (prefixes.has(r)) {
                for (let v of opts.vendors) {
                    acc.push(`${space}${v}${r}:${f.valSep}${val};`);
                }
            }
            acc.push(`${space}${r}:${f.valSep}${val};`);
        }
    }
    return acc.join(f.decls) + f.decls;
}

function makeSelector(parent: any[], curr: any[]) {
    return parent.length ? [...permutations(parent, curr)] : curr;
}

function formatRule(parent: any[], sel: any[], curr: any, opts: CSSOpts) {
    const f = opts.format;
    const space = indent(opts);
    return [
        space,
        transduce(
            map((sel: any[]) => transduce(xfSel, str(), isArray(sel) ? sel : [sel]).trim()),
            str(f.ruleSep),
            makeSelector(parent, sel)),
        f.declStart,
        formatDecls(curr, opts),
        space,
        f.declEnd
    ].join("");
}
